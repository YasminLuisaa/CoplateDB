
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ApiEndpointCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function ApiEndpointCard({
  method,
  endpoint,
  title,
  description,
  children,
}: ApiEndpointCardProps) {
  const methodColors = {
    GET: "bg-blue-100 text-blue-800",
    POST: "bg-green-100 text-green-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={methodColors[method]} variant="outline">
            {method}
          </Badge>
          <code className="text-sm bg-muted px-2 py-1 rounded">{endpoint}</code>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}
