import { Metadata } from "next";
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Check, 
  AlertTriangle, 
  Info,
  ExternalLink,
  FileText,
  MessageSquare,
  Settings,
  Users,
  Shield,
  MousePointer2,
  Keyboard,
  Eye,
  Volume2,
  Brain,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility Statement - RK INSTITUTION',
  description: 'Learn about our commitment to web accessibility at RK INSTITUTION.',
}

const features = [
  {
    icon: Check,
    title: "WCAG 2.1 Compliance",
    description: "We follow Web Content Accessibility Guidelines to ensure our content is perceivable, operable, understandable, and robust."
  },
  {
    icon: Users,
    title: "Universal Design",
    description: "Our platform is designed to be accessible to users of all abilities and preferences."
  },
  {
    icon: Settings,
    title: "Assistive Technology",
    description: "Compatible with screen readers, keyboard navigation, and other assistive technologies."
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description: "We use simple language and provide text alternatives for non-text content."
  }
]

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567"
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@rkinstitution.com",
    href: "mailto:support@rkinstitution.com"
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Education St, Learning City, LC 12345",
    href: "https://maps.google.com"
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Within 5 business days",
    href: null
  }
]

export default function AccessibilityPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
      <Breadcrumbs />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-4">Accessibility Statement</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-[800px]">
          RK INSTITUTION is committed to ensuring digital accessibility for people with disabilities.
          We are continually improving the user experience for everyone.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
          <TabsTrigger value="contact">Contact & Support</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment to Accessibility</h2>
              <p className="text-muted-foreground mb-4">
                We believe that the web should be accessible to everyone. Our team works continuously
                to ensure that all users can access our educational content and services, regardless
                of their abilities or the technologies they use.
              </p>
              <div className="flex gap-4">
                <Button>Learn More</Button>
                <Button variant="outline">View Guidelines</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="mt-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Technologies Used</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>HTML5 with semantic markup</li>
                    <li>WAI-ARIA for enhanced accessibility</li>
                    <li>Modern CSS with accessibility considerations</li>
                    <li>JavaScript with ARIA support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Supported Assistive Technologies</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                    <li>Speech recognition software</li>
                    <li>Screen magnification tools</li>
                    <li>Alternative input devices</li>
        </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-6">Contact & Support</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {contactMethods.map((method) => (
                  <div key={method.title} className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{method.title}</h3>
                      {method.href ? (
                        <Link 
                          href={method.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {method.value}
                        </Link>
                      ) : (
                        <p className="text-muted-foreground">{method.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Compliance Status</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WCAG 2.1 Level AA</h3>
                    <p className="text-muted-foreground">
                      We aim to meet WCAG 2.1 Level AA standards across our platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-warning/10 p-2">
                    <AlertTriangle className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Known Limitations</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Some user-generated content may lack text alternatives</li>
                      <li>Certain third-party integrations may have accessibility limitations</li>
        </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-info/10 p-2">
                    <Info className="h-6 w-6 text-info" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Assessment Methods</h3>
                    <p className="text-muted-foreground">
                      Regular self-evaluation and third-party accessibility audits.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid gap-6 md:grid-cols-3"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Documentation</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Access detailed documentation about our accessibility features and guidelines.
            </p>
            <Button variant="outline" className="w-full">
              View Documentation
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Feedback</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Share your experience or report accessibility issues you encounter.
            </p>
            <Button variant="outline" className="w-full">
              Submit Feedback
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Settings className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Preferences</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Customize your accessibility settings and preferences.
            </p>
            <Button variant="outline" className="w-full">
              Adjust Settings
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground text-center mt-8"
      >
        Last updated: April 27, 2025 • 
        <Link href="/accessibility/archive" className="ml-1 hover:text-primary">
          View previous versions
        </Link>
      </motion.p>
    </main>
  )
}
