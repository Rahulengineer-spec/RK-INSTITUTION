"use client"

import { useState } from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    try {
      setIsSubmitting(true)
      // Here you would typically send the data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-banner to-background/80 py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            We&apos;re here to help you with any questions or concerns
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <div className="glass-card-improved p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Send us a Message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Name
                  </label>
                  <Input 
                    {...form.register("name")}
                    placeholder="Your name" 
                    className="h-11 bg-background text-foreground placeholder:text-muted-foreground border-input/60 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                    aria-invalid={!!form.formState.errors.name}
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Email
                  </label>
                  <Input 
                    {...form.register("email")}
                    type="email" 
                    placeholder="your@email.com" 
                    className="h-11 bg-background text-foreground placeholder:text-muted-foreground border-input/60 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                    aria-invalid={!!form.formState.errors.email}
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Subject
                </label>
                <Input 
                  {...form.register("subject")}
                  placeholder="What can we help you with?" 
                  className="h-11 bg-background text-foreground placeholder:text-muted-foreground border-input/60 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                  aria-invalid={!!form.formState.errors.subject}
                />
                {form.formState.errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.subject.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  {...form.register("message")}
                  placeholder="Describe your issue or question in detail"
                  className="min-h-[150px] bg-background text-foreground placeholder:text-muted-foreground border-input/60 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                  aria-invalid={!!form.formState.errors.message}
                />
                {form.formState.errors.message && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.message.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 button-primary font-semibold transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card-improved p-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <Icons.mail className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a 
                    href="mailto:support@rkinstitution.com" 
                    className="text-foreground/90 hover:text-primary transition-colors"
                  >
                    support@rkinstitution.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <Icons.mail className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-foreground">Technical Support</p>
                  <a 
                    href="mailto:tech@rkinstitution.com" 
                    className="text-foreground/90 hover:text-primary transition-colors"
                  >
                    tech@rkinstitution.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <Icons.mapPin className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-foreground">Address</p>
                  <a 
                    href="https://maps.google.com/?q=123+Education+Street,+Learning+City,+12345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/90 hover:text-primary transition-colors"
                  >
                    123 Education Street, Learning City, 12345
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card-improved p-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Business Hours</h2>
            <div className="space-y-2">
              <p className="flex justify-between text-foreground">
                <span className="font-semibold">Monday - Friday</span>
                <span className="text-foreground/90">9:00 AM - 6:00 PM</span>
              </p>
              <p className="flex justify-between text-foreground">
                <span className="font-semibold">Saturday</span>
                <span className="text-foreground/90">10:00 AM - 4:00 PM</span>
              </p>
              <p className="flex justify-between text-foreground">
                <span className="font-semibold">Sunday</span>
                <span className="text-foreground/90">Closed</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}