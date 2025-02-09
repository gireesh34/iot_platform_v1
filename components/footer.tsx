import Link from "next/link"
import { Cpu } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between space-y-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center space-x-2">
          <Cpu className="h-6 w-6" />
          <span className="font-bold">Atom8ic</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm hover:underline underline-offset-4" href="/terms">
            Terms
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="/privacy">
            Privacy
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 Atom8ic. All rights reserved.</p>
      </div>
    </footer>
  )
}

