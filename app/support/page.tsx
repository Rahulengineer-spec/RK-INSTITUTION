import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react"
import { Mail, Phone, MessageSquare, Clock, Search, HelpCircle, TicketIcon, AlertCircle, CheckCircle2, BookOpen, PlayCircle, Users, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Support - EduTech Institute",
  description: "Get help and support for your learning journey at EduTech Institute.",
}

const supportCategories = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    contact: "support@edutech-institute.com",
    status: "Available",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone Support",
    description: "Talk to our support team directly",
    contact: "+1 (555) 123-4567",
    status: "Busy",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Live Chat",
    description: "Chat with us in real-time",
    contact: "Available 24/7",
    status: "Online",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Response Time",
    description: "Quick resolution guaranteed",
    contact: "Within 24 hours",
    status: "Normal",
  }
];

const commonQuestions = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password."
  },
  {
    question: "How can I update my profile information?",
    answer: "Go to your account settings by clicking on your profile picture, then select 'Edit Profile'. You can update your information there."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers."
  },
  {
    question: "How do I access my course materials?",
    answer: "After logging in, go to your dashboard and click on 'My Courses'. Select the course you want to access to view all materials."
  }
];

const SupportStatus = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
      <span className="text-sm">{status}</span>
    </div>
  );
};

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all ${isOpen ? 'w-80' : 'w-auto'}`}>
      {isOpen ? (
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Live Chat</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>×</Button>
            </div>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-md mb-4"></div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsOpen(true)} className="rounded-full h-12 w-12 p-0">
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          How Can We Help You?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Our support team is here to help you with any questions or issues you may have.
        </p>
        <div className="max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-left"
            />
          </div>
          <Button>Search</Button>
        </div>
      </div>

      <Tabs defaultValue="support" className="mb-12">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="support">Contact Support</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="guide">Troubleshooting</TabsTrigger>
        </TabsList>

        <TabsContent value="support">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {supportCategories.map((category, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="absolute top-4 right-4">
                    <SupportStatus status={category.status} />
                  </div>
            <div className="flex justify-center mb-4 text-primary">
              {category.icon}
            </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
            <p className="font-medium text-primary">{category.contact}</p>
                </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-8 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
        <form className="space-y-6" action="/api/support/contact" method="POST">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" name="email" type="email" placeholder="Your email" required />
            </div>
          </div>
          <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                  <Select name="priority">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" name="subject" placeholder="How can we help?" required />
          </div>
          <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
            <Textarea
              id="message"
              name="message"
              placeholder="Please describe your issue in detail"
              required
              rows={5}
            />
          </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Response Time</AlertTitle>
                  <AlertDescription>
                    We typically respond within 24 hours during business days.
                  </AlertDescription>
                </Alert>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {commonQuestions.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" />
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Track and manage your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <TicketIcon className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Password Reset Issue</h4>
                      <p className="text-sm text-muted-foreground">Ticket #12345</p>
                    </div>
                  </div>
                  <Badge variant="warning">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <TicketIcon className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Course Access Problem</h4>
                      <p className="text-sm text-muted-foreground">Ticket #12344</p>
                    </div>
                  </div>
                  <Badge variant="success">Resolved</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Troubleshooting Guide</CardTitle>
              <CardDescription>Follow the steps to resolve common issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Can&apos;t Access Your Course?</h4>
                  <ol className="space-y-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>You&apos;re logged in</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Verify your enrollment status</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      <span>Clear browser cache and cookies</span>
                    </li>
                  </ol>
                  <Button variant="outline" className="mt-4">
                    Start Guided Resolution
          </Button>
                </div>
              </div>
            </CardContent>
      </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5" />
              <CardTitle>Knowledge Base</CardTitle>
            </div>
            <CardDescription>Find answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="/knowledge-base" className="flex items-center justify-between">
                Browse Articles
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
          </Card>
          <Card className="p-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <PlayCircle className="h-5 w-5" />
              <CardTitle>Video Tutorials</CardTitle>
            </div>
            <CardDescription>Learn through step-by-step guides</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="/tutorials" className="flex items-center justify-between">
                Watch Tutorials
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
          </Card>
          <Card className="p-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5" />
              <CardTitle>Community Forum</CardTitle>
            </div>
            <CardDescription>Connect with other students</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="/community" className="flex items-center justify-between">
                Join Discussion
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
          </Card>
      </div>

      <LiveChat />
    </div>
  );
} 