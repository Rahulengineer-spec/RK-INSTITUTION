import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Support | RK INSTITUTION",
  description: "Get help and support from RK INSTITUTION",
}

const supportOptions = [
  {
    title: "Email Support",
    description: "Get help via email. Our team typically responds within 24 hours.",
    icon: "mail",
    contact: "support@rkinstitution.com",
    action: "Send Email",
  },
  {
    title: "Technical Support",
    description: "For technical issues, bugs, or platform-related questions.",
    icon: "settings",
    contact: "tech@rkinstitution.com",
    action: "Contact Tech Support",
  },
  {
    title: "Course Support",
    description: "Questions about course content, materials, or progress.",
    icon: "book",
    contact: "courses@rkinstitution.com",
    action: "Contact Course Support",
  },
  {
    title: "Billing Support",
    description: "Help with payments, refunds, or billing questions.",
    icon: "credit-card",
    contact: "billing@rkinstitution.com",
    action: "Contact Billing",
  },
]

const commonIssues = [
  {
    title: "Account Access",
    description: "Having trouble logging in or accessing your account?",
    solution: "Try resetting your password or contact our support team for assistance.",
  },
  {
    title: "Course Access",
    description: "Can't access your enrolled courses?",
    solution: "Check your internet connection and browser compatibility. If issues persist, contact course support.",
  },
  {
    title: "Payment Issues",
    description: "Experiencing problems with payments or refunds?",
    solution: "Verify your payment method and check your email for transaction confirmations. Contact billing support if needed.",
  },
  {
    title: "Technical Problems",
    description: "Facing technical difficulties with the platform?",
    solution: "Clear your browser cache, try a different browser, or contact our technical support team.",
  },
]

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-xl text-muted-foreground">
            We're here to help you with any questions or issues
          </p>
        </div>

        {/* Support Form */}
        <div className="mb-12">
          <div className="rounded-lg border p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input placeholder="What can we help you with?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Describe your issue or question in detail"
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Support Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportOptions.map((option) => (
              <div
                key={option.title}
                className="rounded-lg border p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icons.mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{option.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {option.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {option.contact}
                  </span>
                  <Button variant="outline" size="sm">
                    {option.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Common Issues</h2>
          <div className="space-y-4">
            {commonIssues.map((issue) => (
              <div
                key={issue.title}
                className="rounded-lg border p-6 hover:border-primary transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                <p className="text-muted-foreground mb-2">
                  {issue.description}
                </p>
                <p className="text-sm text-primary">{issue.solution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-12 rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available 24/7 to assist you
          </p>
          <Button>Live Chat Support</Button>
        </div>
      </div>
    </div>
  )
} 