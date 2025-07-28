import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";

interface ServerTimeoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  /* onRetry: () => void; */
  title?: string;
  description?: string;
  isRetrying?: boolean;
}

const ServerTimeoutModal = ({
  isOpen,
  onClose,
/*   onRetry, */
  title = "Server Timeout",
  description = "We're having trouble connecting to our servers. This might be due to a slow internet connection or temporary server issues.",
  isRetrying = false,
}: ServerTimeoutModalProps) => {
  const [showRetryButton, setShowRetryButton] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setShowRetryButton(false); // Reset on open
      timer = setTimeout(() => {
        setShowRetryButton(true);
      }, 30000); // 30 seconds
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-neutral-800 border-neutral-700 text-white">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <DialogTitle className="text-xl font-semibold text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-neutral-300 mt-2 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Connection Status */}
        <div className="flex items-center justify-center space-x-2 py-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-neutral-700/50 rounded-lg">
            <WifiOff className="w-4 h-4 text-red-400" />
            <span className="text-sm text-neutral-300">
              Connection issues detected
            </span>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        <div className="space-y-3 py-4 border-t border-neutral-700">
          <h4 className="text-sm font-medium text-white">Quick fixes to try:</h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-brand-400 rounded-full mt-2" />
              <span>Check your internet connection</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-brand-400 rounded-full mt-2" />
              <span>Try refreshing the page</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-brand-400 rounded-full mt-2" />
              <span>Wait a moment and try again</span>
            </li>
          </ul>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white"
          >
            Cancel
          </Button>

          {showRetryButton && (
            <Button
            /*   onClick={onRetry} */
              disabled={isRetrying}
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white disabled:opacity-50"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServerTimeoutModal;
