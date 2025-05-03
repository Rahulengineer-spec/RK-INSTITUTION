import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Certificate Verification FAQ | RK INSTITUTION",
  description: "Frequently asked questions about certificate verification at RK INSTITUTION",
};

const faqs = [
  {
    question: "What is a Certificate Number?",
    answer: "A Certificate Number is a unique identifier assigned to each certificate issued by RK INSTITUTION. It typically starts with 'RK' followed by a series of numbers and may include the year of issuance.",
  },
  {
    question: "Where can I find my Certificate Number?",
    answer: "Your Certificate Number can be found on the top right corner of your physical certificate or in the digital copy sent to your email. It's usually formatted as 'RK-YYYY-XXXXX'.",
  },
  {
    question: "What if I've lost my Certificate Number?",
    answer: "If you've lost your Certificate Number, please contact our support team with your full name, course details, and year of completion. We'll help you retrieve your certificate information.",
  },
  {
    question: "How long does verification take?",
    answer: "Certificate verification is instant in most cases. However, for certificates issued before 2010, the process might take up to 24 hours as we need to check our archived records.",
  },
  {
    question: "Is there a fee for certificate verification?",
    answer: "No, certificate verification is a free service provided by RK INSTITUTION to ensure the authenticity of our certificates.",
  },
  {
    question: "What details do I need for verification?",
    answer: "You'll need your Certificate Number, Full Name (as on the certificate), Father's Name, and Date of Birth. All these details must match our records exactly.",
  },
  {
    question: "Can employers verify certificates?",
    answer: "Yes, employers can verify certificates using the same system. They just need the certificate details provided by the candidate.",
  },
  {
    question: "What if verification fails?",
    answer: "If verification fails, first check if all details are entered correctly. If the problem persists, contact our support team for assistance.",
  },
];

export default function VerificationFAQPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Certificate Verification FAQ
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Find answers to common questions about verifying certificates issued by RK INSTITUTION.
        </p>
      </section>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-muted rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you with any questions about certificate verification.
          </p>
          <div className="space-y-2 text-primary">
            <p>Email: support@rkinstitution.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Monday - Friday, 9:00 AM - 5:00 PM IST</p>
          </div>
        </div>
      </div>
    </div>
  );
} 