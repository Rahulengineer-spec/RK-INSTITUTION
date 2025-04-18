import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "FAQ | RK INSTITUTION",
  description: "Frequently asked questions about RK INSTITUTION",
}

const faqCategories = [
  {
    title: "General Questions",
    icon: "help",
    questions: [
      {
        question: "What is RK INSTITUTION?",
        answer: "RK INSTITUTION is a leading online learning platform that provides high-quality education through interactive courses, expert instructors, and a supportive learning community. We offer courses across various subjects and levels, designed to help students achieve their academic and professional goals.",
      },
      {
        question: "How do I get started?",
        answer: "Getting started is easy! Simply create an account, browse our course catalog, and enroll in your chosen course. You'll have immediate access to course materials and can start learning at your own pace.",
      },
      {
        question: "Is RK INSTITUTION accredited?",
        answer: "Yes, RK INSTITUTION is fully accredited and recognized by major educational bodies. Our courses meet high academic standards and are designed to provide valuable, recognized qualifications.",
      },
    ],
  },
  {
    title: "Course Information",
    icon: "book",
    questions: [
      {
        question: "What types of courses do you offer?",
        answer: "We offer a wide range of courses including academic subjects, professional development, skill-based training, and certification programs. Our courses cover various levels from beginner to advanced.",
      },
      {
        question: "How long do I have access to my courses?",
        answer: "You have lifetime access to all courses you purchase. This includes all future updates and additional materials added to the course. You can learn at your own pace and revisit the content whenever you need.",
      },
      {
        question: "Do you offer certificates upon completion?",
        answer: "Yes, we provide certificates of completion for all our courses. These can be downloaded and shared on your professional profiles. Some courses also offer industry-recognized certifications.",
      },
    ],
  },
  {
    title: "Technical Support",
    icon: "settings",
    questions: [
      {
        question: "What are the technical requirements?",
        answer: "You'll need a stable internet connection and a modern web browser. Our platform is compatible with all major browsers and devices, including desktops, laptops, tablets, and smartphones.",
      },
      {
        question: "How do I access my courses?",
        answer: "Once enrolled, you can access your courses through your dashboard. All course materials, including videos, readings, and assignments, are available 24/7 through our learning platform.",
      },
      {
        question: "What if I experience technical issues?",
        answer: "Our technical support team is available 24/7 to help you with any issues. You can contact us through the support page, email, or live chat for immediate assistance.",
      },
    ],
  },
  {
    title: "Payment & Refunds",
    icon: "credit-card",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment gateway to ensure your financial information is protected.",
      },
      {
        question: "Do you offer any discounts or scholarships?",
        answer: "Yes, we offer various discounts and scholarships for eligible students. Check our promotions page or contact our admissions team for more information about current offers.",
      },
      {
        question: "What is your refund policy?",
        answer: "We offer a 30-day money-back guarantee. If you're not satisfied with your course, you can request a refund within 30 days of purchase, no questions asked.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our platform and services
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Icons.mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category) => (
            <div key={category.title} className="rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you 24/7
          </p>
          <Button>Contact Support</Button>
        </div>
      </div>
    </div>
  )
} 