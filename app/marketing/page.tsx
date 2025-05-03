import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Transform Your Learning Journey
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Empower your educational experience with our comprehensive learning management system.
          Join thousands of students and educators in creating engaging learning environments.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="font-semibold">
              Get Started Free
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="font-semibold">
              Contact Sales
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Interactive Learning",
              description: "Engage with dynamic content, real-time collaboration, and interactive assessments.",
            },
            {
              title: "Progress Tracking",
              description: "Monitor your learning journey with detailed analytics and progress reports.",
            },
            {
              title: "Expert Support",
              description: "Get help from our dedicated support team and community of educators.",
            },
          ].map((feature, index) => (
            <Card key={index} className="border-primary/20">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Basic",
              price: "Free",
              features: ["Basic courses", "Progress tracking", "Community support"],
            },
            {
              title: "Pro",
              price: "$29/month",
              features: [
                "Everything in Basic",
                "Advanced analytics",
                "Priority support",
                "Custom branding",
              ],
              popular: true,
            },
            {
              title: "Enterprise",
              price: "Custom",
              features: [
                "Everything in Pro",
                "Custom integrations",
                "Dedicated support",
                "SLA guarantee",
              ],
            },
          ].map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular ? "border-primary shadow-lg" : "border-primary/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <p className="text-3xl font-bold">{plan.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary/5 rounded-2xl p-12 mb-20">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied users who have already taken their education to the next level.
        </p>
        <Button size="lg" className="font-semibold">
          Start Your Journey
        </Button>
      </section>
    </div>
  );
} 