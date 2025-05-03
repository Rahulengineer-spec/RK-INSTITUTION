-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('event', 'result', 'hackathon', 'announcement', 'achievement')),
  date TIMESTAMPTZ NOT NULL,
  image_url TEXT,
  link_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES profiles(id)
);

-- Create activity_participants table for tracking participation
CREATE TABLE IF NOT EXISTS activity_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activities(id),
  student_id UUID REFERENCES profiles(id),
  role TEXT DEFAULT 'participant',
  achievement TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(activity_id, student_id)
);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Activities are viewable by everyone"
  ON activities FOR SELECT
  USING (status = 'active');

CREATE POLICY "Only admins can manage activities"
  ON activities FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Activity participants are viewable by everyone"
  ON activity_participants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM activities
      WHERE id = activity_id
      AND status = 'active'
    )
  );

CREATE POLICY "Only admins can manage activity participants"
  ON activity_participants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Add indexes for better performance
CREATE INDEX idx_activities_date ON activities(date DESC);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_activities_featured ON activities(is_featured) WHERE is_featured = true; 