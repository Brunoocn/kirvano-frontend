import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function LoadingState({
  message = "Carregando...",
}: {
  message?: string;
}) {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
