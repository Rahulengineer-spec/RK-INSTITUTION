"use client"

import { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog | RK INSTITUTION",
  description: "Latest articles and insights from RK INSTITUTION",
}

const blogPosts = [
  {
    id: 1,
    title: "The Future of Education: How Technology is Transforming Learning",
    excerpt: "Explore how emerging technologies like AI, VR, and adaptive learning are revolutionizing the way students learn and teachers teach.",
    category: "Education Trends",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/blog/tech-education.jpg",
    content: `In today's rapidly evolving educational landscape, technology plays a pivotal role in shaping how students learn and teachers teach. From artificial intelligence to virtual reality, these innovations are not just changing the tools we use but transforming the very nature of education.

Key developments include:
- AI-powered personalized learning paths that adapt to each student's pace and learning style
- Virtual reality field trips and simulations that bring abstract concepts to life
- Gamification of educational content to increase engagement and motivation
- Real-time progress tracking and analytics for better performance monitoring
- Collaborative online platforms that connect students globally
- Interactive digital textbooks with multimedia content
- Automated grading systems that provide instant feedback
- Cloud-based learning management systems for seamless access

These technologies are making education more accessible, engaging, and effective than ever before. Students can now learn at their own pace, access resources anytime, anywhere, and receive personalized support. Teachers benefit from data-driven insights and automated administrative tasks, allowing them to focus more on teaching and student interaction.

The integration of technology in education also prepares students for the digital workforce, equipping them with essential 21st-century skills. As we move forward, the role of technology in education will only continue to grow, creating new opportunities for learning and teaching.`,
  },
  {
    id: 2,
    title: "Parent's Guide: Supporting Your Child's Online Learning Journey",
    excerpt: "Practical tips and strategies for parents to help their children succeed in online education.",
    category: "Parent Resources",
    date: "March 10, 2024",
    readTime: "4 min read",
    image: "/blog/parent-guide.jpg",
    content: `As online learning becomes increasingly prevalent, parents play a crucial role in their children's educational success. Here's a comprehensive guide to supporting your child's online learning journey:

1. Create a Dedicated Learning Space
- Set up a quiet, well-lit area for studying
- Ensure reliable internet access and necessary devices
- Minimize distractions and background noise
- Provide comfortable seating and proper desk setup
- Keep essential supplies within reach

2. Establish a Routine
- Set consistent study hours that align with your child's natural rhythm
- Include regular breaks for physical activity and relaxation
- Balance screen time with offline activities
- Create a visual schedule or checklist
- Set clear expectations for study time and breaks

3. Stay Engaged
- Monitor progress regularly through the learning platform
- Communicate with teachers and attend virtual parent-teacher meetings
- Celebrate achievements and milestones
- Provide emotional support and encouragement
- Help your child set realistic goals

4. Technical Support
- Learn the basics of the learning platform
- Troubleshoot common technical issues
- Ensure proper device maintenance
- Teach your child basic tech troubleshooting
- Keep software and security updates current

5. Social and Emotional Support
- Encourage virtual social interactions with classmates
- Discuss any challenges or concerns openly
- Promote a growth mindset
- Help manage stress and anxiety
- Foster independence while being available for support`,
  },
  {
    id: 3,
    title: "Study Smart: Effective Learning Strategies for Students",
    excerpt: "Discover proven study techniques and time management skills to maximize learning efficiency.",
    category: "Study Tips",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "/blog/study-smart.jpg",
    content: `Success in education isn't just about working hard—it's about working smart. Here are comprehensive learning strategies that can help you achieve better results:

1. Active Learning Techniques
- Practice retrieval through self-testing and flashcards
- Teach concepts to others to reinforce understanding
- Use mind maps and diagrams for visual learning
- Create summary notes in your own words
- Apply concepts to real-world scenarios
- Participate in study groups and discussions
- Use the Feynman technique to explain complex topics simply

2. Time Management
- Use the Pomodoro technique (25-minute focused sessions)
- Create a detailed study schedule
- Prioritize tasks using the Eisenhower matrix
- Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)
- Use digital tools for task management
- Break large tasks into smaller, manageable chunks
- Review and adjust your schedule weekly

3. Memory Enhancement
- Space out your study sessions (spaced repetition)
- Use mnemonic devices and memory palaces
- Connect new information to existing knowledge
- Practice active recall regularly
- Get adequate sleep for memory consolidation
- Use multiple senses in learning
- Review material just before sleep

4. Exam Preparation
- Start preparing well in advance
- Create a study plan for each subject
- Practice with past papers and mock exams
- Focus on understanding rather than memorization
- Use active learning techniques for revision
- Take regular breaks to maintain focus
- Stay physically active and maintain a healthy diet`,
  },
  {
    id: 4,
    title: "Building a Growth Mindset: The Key to Academic Success",
    excerpt: "Learn how developing a growth mindset can help students overcome challenges and achieve their full potential.",
    category: "Student Success",
    date: "February 28, 2024",
    readTime: "5 min read",
    image: "/blog/growth-mindset.jpg",
    content: `A growth mindset is the belief that abilities can be developed through dedication and hard work. Here's how to cultivate it for academic success:

1. Embrace Challenges
- View difficulties as opportunities for growth
- Learn from mistakes and failures
- Persist through obstacles and setbacks
- See effort as a path to mastery
- Welcome constructive criticism
- Take on increasingly difficult tasks
- Celebrate progress, not just results

2. Develop Resilience
- Practice positive self-talk and affirmations
- Set realistic, achievable goals
- Break large goals into smaller steps
- Maintain a problem-solving attitude
- Learn stress management techniques
- Build a support network
- Practice gratitude and mindfulness

3. Foster Curiosity
- Ask questions and seek answers
- Explore new subjects and interests
- Seek feedback and use it constructively
- Connect learning to personal interests
- Read widely beyond required materials
- Engage in discussions and debates
- Take on new learning challenges

4. Practical Applications
- Apply growth mindset principles to daily study
- Use setbacks as learning opportunities
- Track progress and celebrate improvements
- Share your learning journey with others
- Help peers develop their growth mindset
- Maintain a learning journal
- Set regular reflection times`,
  },
  {
    id: 5,
    title: "Digital Wellbeing: Balancing Screen Time and Learning",
    excerpt: "Tips for maintaining healthy digital habits while maximizing educational benefits.",
    category: "Wellness",
    date: "February 20, 2024",
    readTime: "4 min read",
    image: "/blog/digital-wellbeing.jpg",
    content: `In our digital age, maintaining a healthy balance between screen time and other activities is crucial. Here's how to achieve digital wellbeing while maximizing learning:

1. Set Boundaries
- Designate screen-free times and zones
- Create tech-free zones in your home
- Use screen time tracking tools
- Set specific time limits for different activities
- Establish device-free meal times
- Create a digital curfew before bedtime
- Schedule regular digital detox periods

2. Practice Digital Wellness
- Take regular breaks using the 20-20-20 rule (every 20 minutes, look 20 feet away for 20 seconds)
- Maintain good posture and ergonomics
- Protect your eyes with proper lighting and screen settings
- Use blue light filters in the evening
- Keep devices at appropriate distances
- Practice proper typing and mouse techniques
- Stay hydrated and maintain good nutrition

3. Stay Active
- Schedule regular physical activity breaks
- Practice mindfulness and meditation
- Get adequate sleep (7-9 hours)
- Engage in offline hobbies and interests
- Spend time in nature
- Practice deep breathing exercises
- Maintain social connections offline

4. Learning Optimization
- Use productivity tools effectively
- Create a distraction-free study environment
- Practice focused, deep work sessions
- Take regular movement breaks
- Use technology mindfully for learning
- Balance online and offline study methods
- Maintain a healthy study-life balance`,
  },
  {
    id: 6,
    title: "Preparing for Exams: A Comprehensive Guide",
    excerpt: "Expert tips and strategies for effective exam preparation and stress management.",
    category: "Study Tips",
    date: "February 15, 2024",
    readTime: "5 min read",
    image: "/blog/exam-prep.jpg",
    content: `Effective exam preparation requires a combination of good study habits and stress management. Here's your comprehensive guide:

1. Preparation Strategies
- Create a detailed study schedule
- Use active recall techniques
- Practice with past papers
- Make summary notes and mind maps
- Teach concepts to others
- Use spaced repetition
- Create practice questions
- Join study groups

2. Stress Management
- Practice relaxation techniques
- Maintain a healthy routine
- Get enough sleep
- Exercise regularly
- Eat a balanced diet
- Practice mindfulness
- Take regular breaks
- Stay organized

3. Exam Day Tips
- Arrive early and prepared
- Read questions carefully
- Manage your time effectively
- Answer easy questions first
- Show your working
- Review your answers
- Stay calm and focused
- Trust your preparation

4. Post-Exam Review
- Analyze your performance
- Learn from mistakes
- Celebrate your efforts
- Plan improvements
- Seek feedback
- Maintain perspective
- Set new goals
- Continue learning`,
  },
]

const categories = [
  "All Posts",
  "Education Trends",
  "Parent Resources",
  "Study Tips",
  "Student Success",
  "Wellness",
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null)

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const togglePostExpansion = (postId: number) => {
    setExpandedPostId(expandedPostId === postId ? null : postId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, tips, and updates from the world of education
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={cn(
                  "whitespace-nowrap",
                  selectedCategory === category && "bg-primary text-primary-foreground"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="rounded-lg border overflow-hidden">
              <div className="aspect-video bg-muted" />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                
                {expandedPostId === post.id ? (
                  <div className="space-y-4">
                    <div className="prose max-w-none">
                      {post.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => togglePostExpansion(post.id)}
                      className="mt-4"
                    >
                      Show Less
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => togglePostExpansion(post.id)}
                  >
                    Read More
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest articles and updates
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input placeholder="Enter your email" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
} 