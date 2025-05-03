import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { InfoIcon, ShieldIcon, BellIcon, UserIcon, GlobeIcon, BookIcon, MailIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy - EduTech Institute",
  description: "Learn about how we collect, use, and protect your personal information at EduTech Institute.",
}

const TableOfContents = ({ activeSection, onSectionClick }: { activeSection: string; onSectionClick: (section: string) => void }) => (
  <Card className="p-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-auto">
    <h3 className="font-semibold mb-4">Quick Navigation</h3>
    <ul className="space-y-2">
      {["introduction", "information", "usage", "security", "rights", "cookies", "children", "changes", "contact"].map((section) => (
        <li key={section}>
          <Button
            variant={activeSection === section ? "default" : "ghost"}
            className="w-full justify-start text-left"
            onClick={() => onSectionClick(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Button>
        </li>
      ))}
    </ul>
  </Card>
);

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookiePreferences = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  return (
    <Card className="p-4">
      <h4 className="font-semibold mb-4">Cookie Preferences</h4>
      <div className="space-y-4">
        {(Object.entries(preferences) as [keyof CookiePreferences, boolean][]).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="capitalize">{key}</span>
            <Button
              variant={value ? "default" : "outline"}
              onClick={() => setPreferences(prev => ({ ...prev, [key]: !prev[key] }))}
              disabled={key === "necessary"}
            >
              {value ? "Enabled" : "Disabled"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

const ContactForm = () => (
  <form className="space-y-4">
    <Input placeholder="Your Name" />
    <Input type="email" placeholder="Your Email" />
    <Textarea placeholder="Your Message" />
    <Button type="submit">Send Message</Button>
  </form>
);

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const lastUpdated = new Date().toLocaleDateString();
  const version = "2.1.0";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <TableOfContents activeSection={activeSection} onSectionClick={setActiveSection} />
        </aside>

        <main className="md:col-span-3">
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Version {version}</AlertTitle>
            <AlertDescription>Last updated: {lastUpdated}</AlertDescription>
          </Alert>

          <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>

          <div className="space-y-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="introduction" id="introduction">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <BookIcon className="h-5 w-5" />
                    <span>Introduction</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose dark:prose-invert">
                    <p>
                      At EduTech Institute, we take your privacy seriously. This Privacy Policy explains how we collect,
                      use, disclose, and safeguard your information when you visit our website and use our services.
                    </p>
                    <Alert variant="default" className="mt-4">
                      <AlertTitle>Important Notice</AlertTitle>
                      <AlertDescription>
                        By continuing to use our services, you acknowledge that you have read and understood this policy.
                      </AlertDescription>
                    </Alert>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="information">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    <span>Information We Collect</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Tabs defaultValue="personal">
                    <TabsList>
                      <TabsTrigger value="personal">Personal Data</TabsTrigger>
                      <TabsTrigger value="automatic">Automatic Data</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal">
                      <Card>
                        <CardContent className="pt-6">
                          <h4 className="font-semibold mb-4">Personal Information</h4>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Full name and contact information</li>
                            <li>Account credentials</li>
                            <li>Educational history and preferences</li>
                            <li>Payment information</li>
                            <li>Communication preferences</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="automatic">
                      <Card>
                        <CardContent className="pt-6">
                          <h4 className="font-semibold mb-4">Automatically Collected Data</h4>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Device information</li>
                            <li>Browser type and version</li>
                            <li>IP address and location data</li>
                            <li>Usage patterns and analytics</li>
                            <li>Performance metrics</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="h-5 w-5" />
                    <span>Data Security</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Alert variant="default">
                      <ShieldIcon className="h-4 w-4" />
                      <AlertTitle>Enterprise-Grade Security</AlertTitle>
                      <AlertDescription>
                        We employ industry-standard encryption and security measures to protect your data.
                      </AlertDescription>
                    </Alert>
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-4">Security Measures</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>End-to-end encryption</li>
                          <li>Regular security audits</li>
                          <li>Multi-factor authentication</li>
                          <li>24/7 monitoring</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cookies">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <GlobeIcon className="h-5 w-5" />
                    <span>Cookie Policy</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Manage your cookie preferences below:</p>
                    <CookiePreferences />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-5 w-5" />
                    <span>Contact Us</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Have questions about our privacy policy? Contact us:</p>
                    <ContactForm />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Card className="mt-8 p-6">
            <h3 className="font-semibold mb-4">Version History</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Version 2.1.0</span>
                <Badge>Current</Badge>
                <span>{lastUpdated}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Version 2.0.0</span>
                <span>2023-12-01</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Version 1.0.0</span>
                <span>2023-06-01</span>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}