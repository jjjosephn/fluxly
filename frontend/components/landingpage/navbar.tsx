import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
   return (
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-center">
         <nav className="w-full max-w-2xl bg-white border border-border rounded-full shadow-sm px-6 py-2 flex items-center justify-between">
         {/* Logo */}
         <Link href="/" className="flex items-center">
            <p> Fluxly</p>
         </Link>

         {/* Navigation Links */}
         <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
               Features
            </Link>
            <Link href="#pricing" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
               Pricing
            </Link>
            <Link href="#resources" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
               Resources
            </Link>
         </div>

         {/* Auth Buttons */}
         <div className="flex items-center gap-2">
            <Button
               asChild
               size="sm" 
               className="text-sm font-normal bg-zinc-50 text-black rounded-full"
            >
               <Link href="/signin">Sign in</Link>
            </Button>
            <Button
               asChild
               size="sm"
               className="bg-pri hover:bg-[#236aa3] text-white text-sm font-medium px-5 rounded-full"
            >
               <Link href="/signup">Sign up</Link>
            </Button>
         </div>
         </nav>
      </div>
   )
}
