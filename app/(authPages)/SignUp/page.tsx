"use client"
import { Button } from "@/app/component/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/component/ui/Cards";
import { Input } from "@/app/component/ui/Input";
import Label from "@/app/component/ui/Label";
import { Separator } from "@/app/component/ui/Seperator";
import { Checkbox } from "@/app/component/ui/Checkbox";
import Link from "next/link";
import { /* createUserWithEmailAndPassword, sendEmailVerification, */ GoogleAuthProvider, signInWithRedirect, getRedirectResult /* , signInWithEmailAndPassword */ } from "firebase/auth";
import { getDoc, doc, setDoc, serverTimestamp,  } from "firebase/firestore";
import { auth, db } from "@/app/lib/Firebase";
//import { v4 as uuidv4 } from "uuid";
import { InputOTP, InputOTPSlot, InputOTPGroup } from "@/app/component/ui/input-otp";
import {
  FileText,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Check,
  Clock,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";


const SignUp = () => {
   const { signUp, isLoaded } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"signup" | "otp">("signup");
  const [otpValue, setOtpValue] = useState("");
  const [otpTimer, setOtpTimer] = useState(30);

  const [canResendOtp, setCanResendOtp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);


  // Password requirements
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


  const handleGoogleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider); // Redirect sign-in for mobile compatibility
};

useEffect(() => {
  const handleRedirect = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (!result) return; // No redirect result

      const user = result.user;

      // Firestore check or create
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          displayName: user.displayName || "User",
          email: user.email || "",
          allowResumeSaving: true,
          isEmailverified: user.emailVerified,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          history: {},
        });
      }

      // Optional: Success handling
      setSuccess("Signed in successfully");
      setError(null);
    } catch (error: unknown) {
      console.error("Redirect sign-in error:", error);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  handleRedirect();
}, []);

//const id = uuidv4();

const handleEmailSignUp = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (!agreedToTerms) {
    setError("You must agree to the terms and conditions");
    return;
  }

  if (passwordRequirements.some((req) => !req.met)) {
    setError("Password does not meet the requirements");
    return;
  }

  setError(null);
  setSuccess(null);
  setIsLoading(true);

  try {
    if (!isLoaded) return;

    //  Create Clerk account
    await signUp.create({
      emailAddress: formData.email,
      password: formData.password,
    });

    //  Send email verification code
    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });

    setSuccess("Account created! Please check your email to verify your account.");
    setCurrentStep("otp");
    startOtpTimer();
  } catch (err: any) {
    const message =
      err?.errors?.[0]?.message || "Sign-up failed. Please try again.";
    setError(message);
  } finally {
    setIsLoading(false);
  }
};

const handleOtpVerification = async (e: React.FormEvent) => {
  e.preventDefault();

  if (otpValue.length !== 6) {
    setError("Please enter a valid 6-digit OTP");
    return;
  }

  try {
    // Ensure signUp is loaded and defined
    if (!signUp) {
      setError("Sign up process is not initialized. Please try again.");
      return;
    }
    // Attempt verification
    const verificationResult = await signUp.attemptEmailAddressVerification({
      code: otpValue,
    });

    // Automatically signed in by Clerk at this point

    //  Create Firestore user document
    const userId = verificationResult?.createdUserId /* || verificationResult?.createdSessionId */;
    if (!userId) {
      setError("User ID not found after verification.");
      return;
    }
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        allowResumeSaving: true,
        isEmailverified: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        history: {},
      });
    }

    setError(null);
    setSuccess("Email verified. Redirecting...");
    window.location.href = "/dashboard";

  } catch (err: any) {
    const message =
      err?.errors?.[0]?.message || "OTP verification failed. Try again.";
    setError(message);
  }
};

  
  const startOtpTimer = () => {
    setOtpTimer(30);
    setCanResendOtp(false);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          setCanResendOtp(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  
  const handleResendOtp = () => {
    console.log("Resending OTP to:", formData.email);
    setOtpValue("");
    setCanResendOtp(false);
    setOtpTimer(30);
    startOtpTimer();
  };



  /* const handleEmailSignUp = async (e: React.FormEvent) => {
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
  if(passwordRequirements.some(req => !req.met)) {
    setError("Password does not meet the requirements");
    return;
  }
  setError(null);
  setSuccess(null); 
  setIsLoading(true);

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
        isEmailverified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        history: {},
      });
    }

    // Optional: notify user
    setSuccess("Account created! Please check your email to verify your account.Then login to continue.");
    setError(null);
    setIsLoading(false);
    return { success: true, user };

  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "auth/email-already-in-use"
    ) {
      setError("An account with this email already exists. Please sign in.");
      return { success: false, error: "Email already in use" };
    }

    console.error("Sign-up error:", error);
    setError("Sign-up failed. Please try again.");
    return { success: false, error: typeof error === "object" && error !== null && "message" in error ? (error as { message?: string }).message : String(error) };
  }
};
  */



  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            {currentStep === "signup" ? (
              <>
                <h1 className="text-2xl font-bold text-white">
                  Create an account
                </h1>
                <p className="text-neutral-400 mt-2">
                  Start optimizing your resume with AI
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white">
                  Verify your email
                </h1>
                <p className="text-neutral-400 mt-2">
                  We&apos;ve sent a 6-digit code to{" "}
                  <span className="text-white">{formData.email}</span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Sign Up Card */}
        <Card className="border-neutral-700 bg-neutral-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white text-center">
              {currentStep === "signup"
                ? "Sign up for free"
                : "Enter verification code"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStep === "signup" ? (
              <>
                {/* Signup Form */}
                {/* Google Sign Up */}
                <Button
                  variant="outline"
                  className="w-full border-neutral-600 text-white hover:bg-neutral-700 h-12"
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
                    <Separator className="w-full bg-neutral-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-neutral-800 px-2 text-neutral-400">
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
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="pl-10 bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-brand-500 focus:ring-brand-500"
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
                        className="bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-brand-500 focus:ring-brand-500"
                        required
                      />
                    </div>
                  </div>

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
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
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
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
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

                    {/* Password Requirements */}
                    {formData.password && (
                      <div className="mt-2 space-y-1">
                        {passwordRequirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
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
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className="pl-10 pr-10 bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-brand-500 focus:ring-brand-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
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
                      className="border-neutral-600 data-[state=checked]:bg-brand-600"
                    />
                    <label htmlFor="terms" className="text-sm text-neutral-400">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-brand-400 hover:text-brand-300"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-brand-400 hover:text-brand-300"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      !agreedToTerms ||
                  formData.password !== formData.confirmPassword ||
                  isLoading
                    }
                    className="w-full bg-[#2563EB] hover:bg-[#4681ff] flex items-center gap-3 text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
<span>Create account</span> {
                          isLoading && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                          )
                }
                  </Button>
                </form>
              </>
            ) : (
              <>
                {/* OTP Verification Form */}
                <form  onSubmit={handleOtpVerification}  className="space-y-6">
                  {/* OTP Input */}
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otpValue}
                        onChange={(value) => setOtpValue(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="w-12 h-12 text-lg bg-neutral-700 border-neutral-600 text-white focus:border-brand-500 focus:ring-brand-500"
                          />
                          <InputOTPSlot
                            index={1}
                            className="w-12 h-12 text-lg bg-neutral-700 border-neutral-600 text-white focus:border-brand-500 focus:ring-brand-500"
                          />
                          <InputOTPSlot
                            index={2}
                            className="w-12 h-12 text-lg bg-neutral-700 border-neutral-600 text-white focus:border-brand-500 focus:ring-brand-500"
                          />
                          <InputOTPSlot
                            index={3}
                            className="w-12 h-12 text-lg bg-neutral-700 border-neutral-600 text-white focus:border-brand-500 focus:ring-brand-500"
                          />
                          <InputOTPSlot
                            index={4}
                            className="w-12 h-12 text-lg bg-neutral-700 border-neutral-600 text-white focus:border-brand-500 focus:ring-brand-500"
                          />
                          <InputOTPSlot
                            index={5}
                            className="w-12 h-12 text-lg bg-neutral-700 border-neutral-600 text-white focus:border-brand-500 focus:ring-brand-500"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <p className="text-center text-sm text-neutral-400">
                      Enter the 6-digit code sent to your email
                    </p>
                  </div>

                  {/* Timer and Resend */}
                  <div className="text-center space-y-3">
                    {!canResendOtp ? (
                      <div className="flex items-center justify-center space-x-2 text-neutral-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          Resend code in {otpTimer}s
                        </span>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                         onClick={handleResendOtp} 
                        className="text-brand-400 hover:text-brand-300"
                      >
                        Resend verification code
                      </Button>
                    )}
                  </div>

                  {/* Security Note */}
                  <div className="flex items-center space-x-2 p-3 bg-neutral-700/50 rounded-lg">
                    <Shield className="w-4 h-4 text-brand-400" />
                    <span className="text-xs text-neutral-300">
                      This helps us verify that you own this email address
                    </span>
                  </div>

                  {/* Verify Button */}
                  <Button
                    type="submit"
                    disabled={otpValue.length !== 6}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify Email
                  </Button>

                  {/* Back to Edit Email */}
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setCurrentStep("signup")}
                      className="text-neutral-400 hover:text-white text-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to edit email
                    </Button>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        {/* Sign In Link - Only show on signup step */}
        {currentStep === "signup" && (
          <div className="text-center">
            <p className="text-neutral-400">
              Already have an account?{" "}
              <a
                href="/SignIn"
                className="text-brand-400 hover:text-brand-300 font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        )}

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
