"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="flex flex-col gap-3 text-center lg:text-left mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Create an account</h2>
        <p className="text-gray-500 text-lg">
          Start your journey to a 99+ percentile
        </p>
      </div>

      <div className="grid gap-6">
        <form className="grid gap-5">
          <div className="grid gap-2 relative">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                className="h-14 pl-11 rounded-xl bg-gray-50/50 border-2 border-gray-200 focus:border-indigo-600 focus:bg-white transition-all text-base font-medium"
              />
            </div>
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="h-14 pl-11 rounded-xl bg-gray-50/50 border-2 border-gray-200 focus:border-indigo-600 focus:bg-white transition-all text-base font-medium"
              />
            </div>
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-14 pl-11 rounded-xl bg-gray-50/50 border-2 border-gray-200 focus:border-indigo-600 focus:bg-white transition-all text-base font-medium"
              />
            </div>
          </div>

          <Link href="/onboarding" className="w-full mt-2">
            <Button type="button" className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group">
              Create Account <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-500 font-bold tracking-wider">
              Or sign up with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 rounded-xl border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-all">
            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" /><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" /><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" /><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" /></svg>
            Google
          </Button>

        </div>

        <div className="text-center text-sm mt-4 text-gray-500 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
