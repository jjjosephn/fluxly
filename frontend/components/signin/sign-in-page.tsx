"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedNetwork } from "./animated-network"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useToaster } from "@/app/ToasterContext"
import { useRouter } from "next/navigation"
import { BouncingDots } from "../ui/bouncing-dots"

export function SignInCard() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [isHovered, setIsHovered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToaster();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);

    const requestBody = {
      emailOrUsername: formData.emailOrUsername,
      password: formData.password
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if(!res.ok) {
        showToast('error', "Incorrect email, username, or password.", 'top-center');
        setIsSubmitting(false);
        return;
      }

      const data = await res.json()

      localStorage.setItem('token', data.token);

      setFormData({
        emailOrUsername: '',
        password: '',
      })

      router.push('/ly/dashboard');

    } catch (error) {
      console.error("Signin request failed: ", error)
      showToast('error', 'Incorrect email, username, or password.', 'top-center');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full h-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl overflow-hidden rounded-2xl flex bg-card shadow-xl"
      >
        {/* Left side - Animated Network */}
        <div className="hidden md:block w-1/2 h-[600px] relative overflow-hidden border-r border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
            <AnimatedNetwork />
          </div>
        </div>

        {/* Right side - Sign In Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-card">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-1 md:hidden">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="brightness-0"
              />
              <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            </div>
            <h1 className="hidden md:block text-2xl md:text-3xl font-bold mb-1 text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground mb-8">Sign in to your account</p>

            {/* <div className="mb-6">
              <button
                className="w-full flex items-center justify-center gap-2 bg-secondary border border-border rounded-lg p-3 hover:bg-accent transition-all duration-300 text-foreground shadow-sm"
                onClick={() => console.log("Google sign-in")}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fillOpacity=".54"
                  />
                  <path
                    fill="#4285F4"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#34A853"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="#EA4335" d="M1 1h22v22H1z" fillOpacity="0" />
                </svg>
                <span>Login with Google</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">or</span>
              </div>
            </div> */}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="emailOrUsername" className="block text-sm font-medium text-foreground mb-1">
                  Email or Username<span className="text-foreground">*</span>
                </label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  value={formData.emailOrUsername}
                  onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                  required
                  className="bg-secondary border-border placeholder:text-muted-foreground text-foreground w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                  Password <span className="text-foreground">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="bg-secondary border-border placeholder:text-muted-foreground text-foreground w-full pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full relative overflow-hidden bg-cta text-white hover:bg-cta/90 py-2 rounded-lg transition-all duration-300",
                    isHovered ? "shadow-lg" : ""
                  )}
                >
                  {isSubmitting ? (
                      <BouncingDots dots={3} message="Submitting" messagePlacement="right" className="w-2 h-2 bg-white" />
                    ) : (
                      'Sign in'
                    )}
                  </button>
              </motion.div>
{/* 
              <div className="text-center mt-6">
                <a href="#" className="text-foreground hover:text-foreground/80 text-sm transition-colors underline underline-offset-2">
                  Forgot password?
                </a>
              </div> */}

              <div className="text-center text-sm text-muted-foreground">
                {"Don't have an account? "}
                <a href="/signup" className="text-foreground hover:text-foreground/80 transition-colors underline underline-offset-2">
                  Sign up
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
