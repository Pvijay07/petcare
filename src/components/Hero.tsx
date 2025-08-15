import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Star } from "lucide-react";
import heroImage from "@/assets/hero-dog-walking.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="container px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-accent text-accent-foreground">
                🐾 Trusted by 10,000+ pet parents
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Professional Pet Care
                <span className="text-primary"> At Your Service</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Book trusted pet services including walking, grooming, training, and boarding. 
                Your furry friends deserve the best care while you're away.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="hero">
                <Search className="mr-2 h-5 w-5" />
                Find Services
              </Button>
              <Button variant="warm" size="hero">
                How It Works
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background" />
                  ))}
                </div>
                <span className="text-muted-foreground">500+ active providers</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-warning fill-current" />
                <span className="font-semibold">4.9</span>
                <span className="text-muted-foreground">average rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-warm">
              <img
                src={heroImage}
                alt="Happy dog being walked by professional pet care provider"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <Card className="absolute bottom-6 left-6 bg-background/90 backdrop-blur shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Next Available</div>
                    <div className="font-semibold">Today 2:00 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location badge */}
            <Badge className="absolute top-6 right-6 bg-background/90 text-foreground backdrop-blur">
              <MapPin className="mr-1 h-3 w-3" />
              San Francisco
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};