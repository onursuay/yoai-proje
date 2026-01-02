import { Card, CardContent } from "@/components/ui/card";

export function ComingSoon() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Yakında...</p>
      </CardContent>
    </Card>
  );
}

