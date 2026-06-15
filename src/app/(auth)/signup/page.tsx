import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div className="flex flex-col gap-2 text-center lg:text-left mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">Create an account</h2>
        <p className="text-muted-foreground text-sm">
          Start your journey to a 99+ percentile
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              className="h-11"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="h-11"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required className="h-11" />
          </div>
          <Link href="/onboarding" className="w-full">
            <Button type="button" className="w-full h-11 bg-primary text-white hover:bg-primary/90">
              Create Account
            </Button>
          </Link>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
