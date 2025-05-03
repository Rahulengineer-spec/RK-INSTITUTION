import { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ - EduTech Institute",
  description: "Frequently asked questions about EduTech Institute courses, enrollment, and policies.",
}

interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

const faqItems: FAQItem[] = [
  {
    id: "courses",
    question: "What types of courses do you offer?",
    answer: "We offer a wide range of technology-focused courses including web development, data science, artificial intelligence, cybersecurity, and digital marketing. Our courses are designed for both beginners and advanced learners."
  },
  {
    id: "certification",
    question: "Are your certifications recognized?",
    answer: "Yes, our certifications are industry-recognized and endorsed by leading technology companies. They demonstrate your proficiency in the subject matter and can enhance your professional credentials."
  },
  {
    id: "duration",
    question: "How long are the courses?",
    answer: "Course duration varies depending on the subject and level. Most courses range from 4 to 12 weeks, with flexible learning options to accommodate your schedule."
  },
  {
    id: "prerequisites",
    question: "Are there any prerequisites for enrolling?",
    answer: "Prerequisites vary by course. Basic courses typically don't require prior knowledge, while advanced courses may require specific skills or completion of prerequisite courses."
  },
  {
    id: "payment",
    question: "What payment options are available?",
    answer: "We accept major credit cards, PayPal, and offer installment payment plans. Some courses may be eligible for educational financing options."
  },
  {
    id: "refund",
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee for most courses if you're not satisfied. Specific terms and conditions apply, which are detailed during enrollment."
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about our courses and platform
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-lg font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-4">
          Cant find the answer you are looking for? Please reach out to our support team.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
} 