"use client"
import { Button } from "@/app/component/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/component/ui/Cards";
import { Input } from "@/app/component/ui/Input";
import Label from "@/app/component/ui/Label";
import { Separator } from "@/app/component/ui/Seperator";
import { Checkbox } from "@/app/component/ui/Checkbox";
import Link from "next/link";
import { createUserWithEmailAndPassword, sendEmailVerification /* , signInWithEmailAndPassword */ } from "firebase/auth";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/lib/Firebase";

import {
  FileText,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Check,
} from "lucide-react";
import { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic here
    console.log("Google sign up clicked");
  };

 const handleEmailSignUp = async (e: React.FormEvent) => {
  e.preventDefault();

  // Basic validation
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (!agreedToTerms) {
    setError("You must agree to the terms and conditions");
    return;
  }

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Create Firestore document if it doesn't exist
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        displayName:
          user.displayName || `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        allowResumeSaving: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        history: {},
      });
    }

    // Optional: notify user
    setSuccess("Account created! Please check your email to verify your account.");
    return { success: true, user };

  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      setError("An account with this email already exists. Please sign in.");
      return { success: false, error: "Email already in use" };
    }

    console.error("Sign-up error:", error);
    setError("Sign-up failed. Please try again.");
    return { success: false, error: error.message };
  }
};


  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(formData.password),
    },
    {
      label: "Contains lowercase letter",
      met: /[a-z]/.test(formData.password),
    },
    { label: "Contains number", met: /\d/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ResumeAI</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Create an account</h1>
            <p className="text-neutral-400 mt-2">
              Start optimizing your resume with AI
            </p>
          </div>
        </div>

        {/* Sign Up Card */}
        <Card className="border-[#334155] bg-[#1E293B]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white text-center">
              Sign up for free
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign Up */}
            <Button
              variant="outline"
              className="w-full border-[#475569] text-white hover:bg-[#334155] h-12"
              onClick={handleGoogleSignUp}
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
                <Separator className="w-full bg-[#475569]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1E293B] px-2 text-[#94A3B8]">
                  Or continue with
                </span>
              </div>
            </div>
            {error && (
  <p className="text-red-500 text-sm text-center">
    {error}
  </p>
)}

{success && (
  <p className="text-green-500 text-sm text-center">
    {success}
  </p>
)}

           

            {/* Email Sign Up Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-4 ">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="pl-10 bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8] focus:border-brand-500 focus:ring-brand-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8]  focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8]  focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10 bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8]  focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-[#94A3B8]" />
                    ) : (
                      <Eye className="w-4 h-4 text-[#94A3B8]" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check
                          className={`w-3 h-3 ${
                            req.met ? "text-green-400" : "text-neutral-500"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            req.met ? "text-green-400" : "text-neutral-500"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="pl-10 pr-10 bg-[#334155] border-[#475569] text-white placeholder-[#94A3B8]  focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-[#94A3B8]" />
                    ) : (
                      <Eye className="w-4 h-4 text-[#94A3B8]" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-400">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={checked => setAgreedToTerms(checked === true)}
                  className="border-[#94A3B8] data-[state=checked]:bg-brand-600"
                />
                <label htmlFor="terms" className="text-sm text-[#94A3B8]">
                  I agree to the{" "}
                  <a href="#" className="text-[#60A5FA] hover:text-[#99bde9]">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#60A5FA] hover:text-[#99bde9]">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                disabled={
                  !agreedToTerms ||
                  formData.password !== formData.confirmPassword
                }
                className="w-full bg-brand-600 hover:bg-brand-700 text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create account
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-[#94A3B8]">
            Already have an account?{" "}
            <a
              href="/SignIn"
              className="text-[#60A5FA] hover:text-[#99bde9] font-medium"
            >
              Sign in
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-neutral-400 hover:text-white text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
