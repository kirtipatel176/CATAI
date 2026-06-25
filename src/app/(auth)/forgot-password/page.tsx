"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="flex flex-col gap-3 text-center lg:text-left mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Reset password</h2>
        <p className="text-gray-500 text-lg">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="grid gap-6">
        <form className="grid gap-5">
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

          <Button type="button" className="w-full mt-2 h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group">
            Send Reset Link <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="text-center text-sm mt-4 text-gray-500 font-medium flex items-center justify-center gap-2">
          <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-2 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
