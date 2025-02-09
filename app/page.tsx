import { Features } from "@/components/features"
import { Hero } from "@/components/hero"
import { Pricing } from "@/components/pricing"
import { Contact } from "@/components/contact"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900">
          <Features />
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <Pricing />
        </section>

        {/* Contact Section */}
        <Contact />
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Drone IoT Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

