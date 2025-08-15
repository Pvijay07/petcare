import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
  location: string;
  isPopular?: boolean;
}

export const ServiceCard = ({
  id,
  title,
  description,
  image,
  price,
  duration,
  rating,
  location,
  isPopular = false,
}: ServiceCardProps) => {
  const navigate = useNavigate();
  return (
    <Card 
      className="group overflow-hidden bg-card shadow-card hover:shadow-soft transition-all duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => navigate(`/service/${id}`)}
    >
      {isPopular && (
        <Badge className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground">
          Popular
        </Badge>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-card-foreground line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-warning">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">Starting from</span>
            <div className="text-2xl font-bold text-primary">{price}</div>
          </div>
          <Button 
            variant="hero" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/service/${id}`);
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};