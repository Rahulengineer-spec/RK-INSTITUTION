import Link from "next/link"
import { Icons } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-br from-banner via-background to-background/90 backdrop-blur-xl shadow-2xl">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter Banner */}
        <div className="mb-16 p-8 rounded-2xl glass shadow-xl border-0">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Join Our Learning Community</h2>
            <p className="text-base text-foreground/80 mb-6">Get weekly insights, course updates, and learning resources delivered to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                type="email"
                className="rounded-full h-12 bg-background/60 border-primary/20 focus:border-primary shadow-md focus:ring-2 focus:ring-primary/30"
                required 
              />
              <Button className="rounded-full h-12 px-8 button-primary transition-all duration-300">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold tracking-tight gradient-text">RK INSTITUTION</span>
            </Link>
            <p className="text-sm text-foreground/80">
              Empowering minds with cutting-edge education and innovative learning experiences.
            </p>
            <div className="flex space-x-4 mt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="https://github.com/your-org" className="text-accent hover:text-primary transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                    <Icons.gitHub className="h-6 w-6 hover:scale-125 transition-transform" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="https://google.com" className="text-accent hover:text-primary transition-colors" aria-label="Google" target="_blank" rel="noopener noreferrer">
                    <Icons.google className="h-6 w-6 hover:scale-125 transition-transform" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Google</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="https://linkedin.com/company/your-org" className="text-accent hover:text-primary transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <Icons.linkedin className="h-6 w-6 hover:scale-125 transition-transform" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="https://twitter.com/your-org" className="text-accent hover:text-primary transition-colors" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                    <Icons.twitter className="h-6 w-6 hover:scale-125 transition-transform" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Twitter</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Icons.book className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Browse Courses</span>
                </Link>
              </li>
              <li>                <Link href="/blog" className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Icons.post className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Blog & Resources</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Icons.info className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Icons.contact className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Icons.help className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Icons.support className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Support Center</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Icons.shield className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Icons.file className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <Icons.mapPin className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Visit Us</p>
                  <p className="text-sm text-foreground/80">123 Education St,<br />Learning City, LC 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Icons.phone className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Call Us</p>
                  <p className="text-sm text-foreground/80">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Icons.mail className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Email Us</p>
                  <p className="text-sm text-foreground/80">support@rkinstitution.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} RK INSTITUTION</span>
              <span className="hidden md:inline text-foreground/40">|</span>
              <span className="text-sm text-foreground/60">All rights reserved</span>
              <span className="hidden md:inline text-foreground/40">|</span>
              <span className="text-sm text-foreground/60">Developed by Rahul Choudhary</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/sitemap" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Sitemap
              </Link>
              <span className="text-foreground/40">|</span>
              <Link href="/accessibility" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}