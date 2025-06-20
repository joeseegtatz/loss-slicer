import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = "info" | "loading" | "success" | "error";

interface StatusDisplayProps {
  type: StatusType;
  message: string;
  className?: string;
}

export function StatusDisplay({ type, message, className }: StatusDisplayProps) {
  const icons = {
    info: <Info className="h-4 w-4 text-blue-500 mr-2" />,
    loading: <Loader2 className="h-4 w-4 text-gray-500 mr-2 animate-spin" />,
    success: <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />,
    error: <AlertCircle className="h-4 w-4 text-red-500 mr-2" />,
  };

  const styles = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    loading: "bg-gray-50 text-gray-800 border-gray-200",
    success: "bg-green-50 text-green-800 border-green-200", 
    error: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div
      className={cn(
        "flex items-center p-2 text-sm border rounded-md",
        styles[type],
        className
      )}
    >
      {icons[type]}
      <span>{message}</span>
    </div>
  );
}
