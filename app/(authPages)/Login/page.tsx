import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText, Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { useState } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    console.log("Google sign in clicked");
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email sign in logic here
    console.log("Email sign in:", { email, password });
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ResumeAI</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-neutral-400 mt-2">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        {/* Sign In Card */}
        <Card className="border-neutral-700 bg-neutral-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white text-center">
              Sign in to your account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full border-neutral-600 text-white hover:bg-neutral-700 h-12"
              onClick={handleGoogleSignIn}
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-neutral-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-800 px-2 text-neutral-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Email Sign In Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-600 bg-neutral-700 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-neutral-400">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-brand-400 hover:text-brand-300"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white h-12"
              >
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-neutral-400">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-brand-400 hover:text-brand-300 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center text-neutral-400 hover:text-white text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
