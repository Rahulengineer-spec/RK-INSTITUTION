"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            We&apos;re here to help you with any questions or concerns
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <div className="rounded-lg border p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
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

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Icons.mail className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">support@rkinstitution.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Icons.mail className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Technical Support</p>
                  <p className="text-muted-foreground">tech@rkinstitution.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Icons.mail className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    123 Education Street, Learning City, 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}