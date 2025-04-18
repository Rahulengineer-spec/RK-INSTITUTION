import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | RK INSTITUTION",
  description: "Privacy policy for RK INSTITUTION",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            At RK INSTITUTION, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2>2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Course progress and completion data</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process your payments</li>
            <li>Send you important updates and notifications</li>
            <li>Improve our services and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>4. Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Third parties with your consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@rkinstitution.com
          </p>
        </section>
      </div>
    </div>
  )
} 