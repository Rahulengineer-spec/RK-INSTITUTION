/*
  # Initial Schema Setup for Educational Institution

  1. Tables
    - profiles (extends auth.users)
    - courses
    - enrollments
    - lectures
    - notes
    - payments
    - testimonials
    - enquiries
    
  2. Security
    - RLS policies for all tables
    - Public access for testimonials and enquiries
    - Authenticated access for other tables
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  student_id TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT NOT NULL,
  duration TEXT,
  fee DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id),
  course_id UUID REFERENCES courses(id),
  enrollment_date TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active',
  progress INTEGER DEFAULT 0,
  UNIQUE(student_id, course_id)
);

-- Create lectures table
CREATE TABLE IF NOT EXISTS lectures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration INTEGER,
  sequence_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lecture_id UUID REFERENCES lectures(id),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id),
  course_id UUID REFERENCES courses(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_date TIMESTAMPTZ DEFAULT now(),
  receipt_url TEXT
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Enrolled students can view lectures"
  ON lectures FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE student_id = auth.uid()
      AND course_id = lectures.course_id
    )
  );

CREATE POLICY "Enrolled students can view notes"
  ON notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE student_id = auth.uid()
      AND course_id = (
        SELECT course_id FROM lectures WHERE id = notes.lecture_id
      )
    )
  );

CREATE POLICY "Students can view own payments"
  ON payments FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (true);