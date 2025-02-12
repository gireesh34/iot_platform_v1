import { Features } from '@/components/features';
import { Hero } from '@/components/hero';
import { Pricing } from '@/components/pricing';
import { Contact } from '@/components/contact';
import { supabaseServer } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Header } from "@/components/header"

export default async function LandingPage() {
  const cookieStore = cookies();
  const supabase = supabaseServer();

  const { data: todos } = await supabase.from('todos').select();

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
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

        {/* Todos Section */}
        <section id="todos" className="py-20">
          <ul>
            {todos?.map((todo: { id: string; title: string }) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Drone IoT Platform. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
