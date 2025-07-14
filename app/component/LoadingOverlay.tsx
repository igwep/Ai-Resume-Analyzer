import LoadingSpinner from "./LoadingSpinner";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  type?: "default" | "dashboard" | "analysis";
}

const LoadingOverlay = ({
  isVisible,
  message = "Loading...",
  type = "dashboard",
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/95 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-neutral-800 rounded-2xl border border-neutral-700 shadow-2xl p-8 max-w-md w-full mx-4">
        <LoadingSpinner size="xl" message={message} type={type} />

        {/* Additional branding */}
        <div className="mt-6 pt-6 border-t border-neutral-700 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">ResumeAI</span>
          </div>
          <p className="text-xs text-neutral-500">Powered by AI Technology</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
