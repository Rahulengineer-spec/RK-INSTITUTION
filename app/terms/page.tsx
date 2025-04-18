import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Terms of Service | RK INSTITUTION",
  description: "Terms and conditions for using RK INSTITUTION's services",
}

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing and using RK INSTITUTION's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      "We reserve the right to modify these terms at any time. Your continued use of the service after any changes indicates your acceptance of the modified terms.",
    ],
  },
  {
    title: "2. User Accounts",
    content: [
      "To access certain features of our platform, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
      "You must provide accurate and complete information when creating your account. You may not use another person's account without their permission.",
      "We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or harmful activities.",
    ],
  },
  {
    title: "3. Course Enrollment and Access",
    content: [
      "Course enrollment is subject to payment of applicable fees. Upon successful payment, you will be granted access to the course materials.",
      "Course access is granted for personal, non-commercial use only. You may not share your login credentials or course materials with others.",
      "We reserve the right to modify or discontinue any course at any time. In such cases, enrolled students will be notified and may be offered alternative options.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All content on our platform, including courses, materials, logos, and designs, is protected by copyright and other intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works of our content without explicit permission.",
      "Your use of our platform does not grant you any ownership rights to our intellectual property.",
    ],
  },
  {
    title: "5. User Content",
    content: [
      "You retain ownership of any content you submit to our platform, but you grant us a license to use, modify, and distribute it for the purpose of providing our services.",
      "You are responsible for ensuring that your content does not violate any laws or infringe on the rights of others.",
      "We reserve the right to remove any content that violates these terms or that we deem inappropriate.",
    ],
  },
  {
    title: "6. Payment and Refunds",
    content: [
      "All payments are processed securely through our payment gateway. You agree to provide accurate payment information.",
      "Refunds are available within 30 days of purchase, subject to our refund policy. To request a refund, contact our support team.",
      "We reserve the right to change our pricing at any time. Price changes will not affect existing enrollments.",
    ],
  },
  {
    title: "7. Privacy",
    content: [
      "Your use of our services is also governed by our Privacy Policy. Please review it to understand how we collect and use your information.",
      "We implement security measures to protect your personal information, but we cannot guarantee absolute security.",
      "You are responsible for maintaining the security of your account and personal information.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    content: [
      "Our platform is provided 'as is' without warranties of any kind. We do not guarantee that our services will be uninterrupted or error-free.",
      "We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.",
      "Our total liability for any claims related to our services is limited to the amount you paid for the specific course or service in question.",
    ],
  },
  {
    title: "9. Termination",
    content: [
      "We may terminate or suspend your account and access to our services at any time, with or without cause.",
      "Upon termination, you will lose access to all course materials and services.",
      "Sections of these terms that should survive termination will continue to apply.",
    ],
  },
  {
    title: "10. Governing Law",
    content: [
      "These terms are governed by the laws of the jurisdiction where RK INSTITUTION is registered.",
      "Any disputes arising from these terms will be resolved in the courts of that jurisdiction.",
      "If any provision of these terms is found to be invalid, the remaining provisions will remain in effect.",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: March 15, 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            Welcome to RK INSTITUTION. These Terms of Service govern your use of our website and services. Please read them carefully before using our platform.
          </p>

          {termsSections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.content.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 rounded-lg border p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Questions?</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these terms, please contact our support team
            </p>
            <Button>Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  )
} 