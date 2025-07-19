import { Brain, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  message?: string;
  type?: "default" | "dashboard" | "analysis";
}

const LoadingSpinner = ({
  size = "md",
  message = "Loading...",
  type = "default",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  if (type === "dashboard") {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        {/* Animated Brand Logo */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-brand-600/20 animate-spin">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand-600 rounded-full"></div>
          </div>

          {/* Inner pulsing ring */}
          <div className="absolute inset-2 rounded-full border-2 bg-[#2563EB]/40 animate-pulse"></div>

          {/* Center logo */}
          <div
            className={`relative ${sizeClasses[size]} bg-[#2563EB] rounded-full flex items-center justify-center shadow-lg shadow-brand-600/25`}
          >
            <Brain className={`${iconSizes[size]} text-white animate-pulse`} />
          </div>
        </div>

        {/* Loading message */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-white">{message}</h3>
          <p className="text-neutral-400 text-sm">
            Preparing your dashboard...
          </p>

          {/* Progress dots */}
          <div className="flex justify-center space-x-1 mt-4">
            <div
              className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#3c74ec] rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#6693f3] rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "analysis") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6">
        {/* Spinning AI icon with particles */}
        <div className="relative">
          {/* Particle effects */}
          <div className="absolute -inset-4">
            <div
              className="absolute top-0 left-0 w-1 h-1 bg-brand-400 rounded-full animate-ping"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="absolute top-2 right-1 w-1 h-1 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: "200ms" }}
            ></div>
            <div
              className="absolute bottom-1 left-2 w-1 h-1 bg-green-400 rounded-full animate-ping"
              style={{ animationDelay: "400ms" }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-1 h-1 bg-blue-400 rounded-full animate-ping"
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>

          {/* Main spinning element */}
          <div
            className={`relative ${sizeClasses[size]} bg-gradient-to-br from-brand-600 to-brand-700 rounded-full flex items-center justify-center animate-spin shadow-lg`}
          >
            <Sparkles className={`${iconSizes[size]} text-white`} />
          </div>
        </div>

        <div className="text-center">
          <p className="text-white font-medium">{message}</p>
          <p className="text-neutral-400 text-xs mt-1">AI is analyzing...</p>
        </div>
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        {/* Spinning ring */}
        <div
          className={`${sizeClasses[size]} border-4 border-neutral-700 border-t-brand-600 rounded-full animate-spin`}
        ></div>

        {/* Inner dot */}
        <div className="absolute inset-4 bg-brand-600 rounded-full animate-pulse opacity-60"></div>
      </div>

      {message && (
        <p className="text-neutral-300 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
