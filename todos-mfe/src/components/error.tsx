import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function Error({
  message,
  error,
}: {
  message: string;
  error: string;
}) {
  return (
    <Card className="w-full border-destructive">
      <CardContent className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h3 className="font-medium text-destructive mb-2">{message}</h3>
            <p className="text-sm text-muted-foreground max-w-md">{error}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
