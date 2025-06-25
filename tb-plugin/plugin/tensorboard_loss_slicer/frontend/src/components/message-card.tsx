import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface MessageCardProps {
  message: string;
  type?: "info" | "error" | "loading";
  className?: string;
}

export function MessageCard({ message, type = "info", className = "" }: MessageCardProps) {
  const getTextColor = () => {
    switch (type) {
      case "error":
        return "text-destructive";
      case "loading":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={`w-full h-[70vh] flex items-center justify-center ${className}`}>
      <CardContent className="flex flex-col items-center gap-3 text-center">
        {type === "loading" && (
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        )}
        <p className={getTextColor()}>{message}</p>
      </CardContent>
    </Card>
  );
}
