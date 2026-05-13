import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type MessageType = "success" | "error" | "info";

interface MessagePortalProps {
  isOpen: boolean;
  type?: MessageType;
  message: string;
  onClose?: () => void;
  duration?: number;
}

export const MessagePortal = ({
  isOpen,
  type = "info",
  message,
  onClose,
  duration = 3000,
}: MessagePortalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    },

    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    },

    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <Info className="w-5 h-5 text-blue-600" />,
    },
  };
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pointer-events-none">
      <div
        className={`
          mt-6
          w-full
          max-w-md
          mx-4
          rounded-2xl
          border
          shadow-2xl
          backdrop-blur-sm
          pointer-events-auto
          animate-in
          fade-in
          slide-in-from-top-5
          duration-300
          ${styles[type].container}
        `}
      >
        <div className="flex items-start gap-3 p-4">
          <div className="mt-0.5">{styles[type].icon}</div>

          <div className="flex-1">
            <p className="text-sm font-semibold leading-relaxed">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-black/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-1 w-full overflow-hidden rounded-b-2xl bg-black/5">
          <div
            className="h-full bg-current opacity-30 animate-[message-progress_linear_forwards]"
            style={{
              animationDuration: `${duration}ms`,
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes message-progress {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }

          .animate-\\[message-progress_linear_forwards\\] {
            animation-name: message-progress;
          }
        `}
      </style>
    </div>,
    document.body,
  );
};
