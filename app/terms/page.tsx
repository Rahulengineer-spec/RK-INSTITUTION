import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { 
  BookOpen, 
  FileText, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Calendar, 
  Shield, 
  User, 
  CreditCard, 
  Copyright,
  UserX,
  FileCode,
  XCircle,
  Scale,
  History,
  Mail,
  Printer,
  Download,
  ExternalLink
} from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - EduTech Institute",
  description: "Read our terms of service and user agreement for using EduTech Institute platform.",
}

const termsSections = [
  {
    id: "acceptance",
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "1. Acceptance of Terms",
    content: [
      "By accessing and using the EduTech Institute platform (&quot;Platform&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Platform.",
      "We reserve the right to modify these terms at any time. Your continued use of the Platform after any changes indicates your acceptance of the modified terms.",
    ] as (string | string[])[],
    importance: "critical"
  },
  {
    id: "accounts",
    icon: <User className="h-5 w-5" />,
    title: "2. User Accounts",
    content: [
      "To access certain features of the Platform, you must register for an account. You agree to:",
      "Provide accurate and complete information",
      "Maintain the security of your account credentials",
      "Promptly update any changes to your information",
      "Accept responsibility for all activities under your account",
      "We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or harmful activities.",
    ],
    importance: "high"
  },
  {
    id: "enrollment",
    icon: <CreditCard className="h-5 w-5" />,
    title: "3. Course Enrollment and Payment",
    content: [
      "When enrolling in courses:",
      "Course fees must be paid in full unless otherwise specified",
      "Some courses may have prerequisites or requirements",
      "Refunds are subject to our refund policy",
      "Course access may be limited to a specific duration",
      "Payment processing is handled securely through our authorized payment providers",
      "All prices are subject to change without notice",
      "Promotional codes and discounts may have specific eligibility requirements",
    ],
    importance: "high"
  },
  {
    id: "intellectual-property",
    icon: <Copyright className="h-5 w-5" />,
    title: "4. Intellectual Property",
    content: [
      "All content on the Platform, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of EduTech Institute or its content suppliers and is protected by international copyright laws.",
      "You may not reproduce, distribute, modify, or create derivative works of our content without explicit permission.",
      "Your use of our Platform does not grant you any ownership rights to our intellectual property.",
      "Course materials are licensed, not sold, to you for personal, non-commercial use only",
      "Any unauthorized use of our intellectual property may result in legal action",
    ],
    importance: "high"
  },
  {
    id: "conduct",
    icon: <Shield className="h-5 w-5" />,
    title: "5. User Conduct",
    content: [
      "You agree not to:",
      "Share your account credentials with others",
      "Copy or distribute course materials",
      "Engage in disruptive behavior",
      "Upload malicious content",
      "Violate any applicable laws or regulations",
      "Attempt to access unauthorized areas of the Platform",
      "Use automated systems or bots to access the Platform",
      "Interfere with the proper functioning of the Platform",
    ],
    importance: "high"
  },
  {
    id: "guidelines",
    icon: <FileCode className="h-5 w-5" />,
    title: "6. Content and Behavior Guidelines",
    content: [
      "When participating in courses or discussions, you must:",
      "Respect intellectual property rights",
      "Maintain professional and respectful communication",
      "Submit original work for assignments",
      "Follow academic integrity guidelines",
      "Avoid hate speech, harassment, or discriminatory behavior",
      "Report violations or inappropriate content",
      "Respect the privacy of other users",
    ],
    importance: "medium"
  },
  {
    id: "termination",
    icon: <UserX className="h-5 w-5" />,
    title: "7. Termination",
    content: [
      "We reserve the right to suspend or terminate your account and access to the Platform for violations of these Terms or for any other reason at our discretion.",
      "Upon termination, you will lose access to all course materials and services.",
      "Sections of these terms that should survive termination will continue to apply.",
      "No refunds will be provided for termination due to violations",
      "You may appeal a termination decision within 30 days",
    ],
    importance: "medium"
  },
  {
    id: "liability",
    icon: <Scale className="h-5 w-5" />,
    title: "8. Limitation of Liability",
    content: [
      "EduTech Institute shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Platform.",
      "Our total liability for any claims related to our services is limited to the amount you paid for the specific course or service in question.",
      "We do not guarantee uninterrupted access to the Platform",
      "We are not responsible for third-party content or links",
      "Force majeure events may affect our service delivery",
    ],
    importance: "critical"
  },
  {
    id: "changes",
    icon: <History className="h-5 w-5" />,
    title: "9. Changes to Terms",
    content: [
      "We may modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the modified Terms.",
      "Major changes will be notified via email or Platform announcements",
      "Users are responsible for reviewing terms periodically",
      "Previous versions of terms may be available upon request",
    ],
    importance: "medium"
  },
  {
    id: "contact",
    icon: <Mail className="h-5 w-5" />,
    title: "10. Contact Information",
    content: [
      "For questions about these Terms, please contact us at:",
      "Email: legal@edutech-institute.com",
      "Phone: +1 (555) 123-4567",
      "Address: 123 Education Street, Learning City, ED 12345",
      "Response time: Within 2 business days",
      "For urgent matters: Use our 24/7 support chat",
    ],
    importance: "low"
  },
];

const TableOfContents = ({ activeSection, onSectionClick }: { activeSection: string; onSectionClick: (section: string) => void }) => (
  <Card className="p-4 sticky top-4">
    <CardHeader>
      <CardTitle>Table of Contents</CardTitle>
      <CardDescription>Navigate through our terms</CardDescription>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-1">
          {termsSections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => onSectionClick(section.id)}
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <span className="truncate">{section.title}</span>
                {section.importance === "critical" && (
                  <Badge variant="error" className="ml-auto">Critical</Badge>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);

const VersionHistory = () => (
  <Card>
    <CardHeader>
      <CardTitle>Version History</CardTitle>
      <CardDescription>Track changes to our terms</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Version 3.0</p>
            <p className="text-sm text-muted-foreground">Current Version</p>
          </div>
          <Badge>Latest</Badge>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Version 2.5</p>
            <p className="text-sm text-muted-foreground">Added GDPR compliance</p>
          </div>
          <span className="text-sm text-muted-foreground">2023-09-01</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Version 2.0</p>
            <p className="text-sm text-muted-foreground">Major revision</p>
          </div>
          <span className="text-sm text-muted-foreground">2023-06-01</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const RelatedPolicies = () => (
  <Card>
    <CardHeader>
      <CardTitle>Related Policies</CardTitle>
      <CardDescription>Other policies you should review</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start" asChild>
          <a href="/privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy Policy
            <ExternalLink className="h-4 w-4 ml-auto" />
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <a href="/cookies" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Cookie Policy
            <ExternalLink className="h-4 w-4 ml-auto" />
          </a>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <a href="/accessibility" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Accessibility Statement
            <ExternalLink className="h-4 w-4 ml-auto" />
          </a>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [hasAccepted, setHasAccepted] = useState(false);
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="space-y-6">
            <TableOfContents activeSection={activeSection} onSectionClick={setActiveSection} />
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                Print Terms
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </aside>

        <main className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="default">Version 3.0</Badge>
                <span className="text-sm text-muted-foreground">Last updated: {lastUpdated}</span>
              </div>
              <CardTitle className="text-3xl">Terms of Service</CardTitle>
              <CardDescription>
                Please read these terms carefully before using our platform.
              </CardDescription>
            </CardHeader>
          </Card>

          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              By using our platform, you agree to these terms. If you do not agree, please do not use our services.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {termsSections.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      {section.icon}
                      <span>{section.title}</span>
                      {section.importance === "critical" && (
                        <Badge variant="error" className="ml-2">Critical</Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {section.content.map((paragraph: string | string[], index: number) => (
                        typeof paragraph === "string" ? (
                          <p key={index} className="text-muted-foreground">
                            {paragraph}
                          </p>
                        ) : (
                          <ul key={index} className="list-disc pl-6 space-y-2">
                            {paragraph.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="text-muted-foreground">{item}</li>
                            ))}
          </ul>
                        )
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={hasAccepted}
                  onCheckedChange={(checked) => setHasAccepted(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept Terms of Service
                  </label>
                  <p className="text-sm text-muted-foreground">
                    I have read and agree to the terms of service
                  </p>
        </div>
              </div>
              <Button className="w-full mt-4" disabled={!hasAccepted}>
                Continue to Platform
              </Button>
            </CardContent>
          </Card>
        </main>

        <aside className="md:col-span-1 space-y-6">
          <VersionHistory />
          <RelatedPolicies />
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Contact our legal team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:legal@edutech-institute.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Legal Team
                </a>
              </Button>
            </CardContent>
          </Card>
        </aside>
        </div>
    </div>
  );
}