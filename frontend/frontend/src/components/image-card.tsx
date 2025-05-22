
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Check, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  imageUrl: string;
  title: string;
  date: Date;
  location?: string;
  status: "approved" | "pending" | "rejected";
  className?: string;
}

export function ImageCard({ 
  imageUrl, 
  title, 
  date, 
  location, 
  status, 
  className 
}: ImageCardProps) {
  const statusConfig = {
    approved: {
      label: "Aprovada",
      color: "bg-green-100 text-green-800",
      icon: <Check className="h-3 w-3 mr-1" />,
    },
    pending: {
      label: "Pendente",
      color: "bg-yellow-100 text-yellow-800",
      icon: null,
    },
    rejected: {
      label: "Rejeitada",
      color: "bg-red-100 text-red-800",
      icon: <X className="h-3 w-3 mr-1" />,
    },
  };

  const statusInfo = statusConfig[status];

  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <div className="relative aspect-square">
        <img 
          src={imageUrl} 
          alt={title}
          className="object-cover w-full h-full"
        />
        <Badge 
          className={cn(
            "absolute top-2 right-2 font-normal",
            statusInfo.color
          )}
          variant="outline"
        >
          {statusInfo.icon}
          {statusInfo.label}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium truncate">{title}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-1">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{format(date, "dd/MM/yyyy")}</span>
        </div>
        {location && (
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
