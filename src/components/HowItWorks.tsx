import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, Calendar, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Services",
    description: "Browse and select from walking, grooming, training, or boarding services in your area.",
  },
  {
    icon: Calendar,
    title: "Book & Schedule",
    description: "Choose your preferred date, time, and add-ons. Providers will bid on your request.",
  },
  {
    icon: Users,
    title: "Get Matched",
    description: "Review provider profiles, ratings, and bids. Select your preferred pet care professional.",
  },
  {
    icon: Star,
    title: "Enjoy Service",
    description: "Receive real-time updates, photos, and GPS tracking. Rate your experience when complete.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How PetCare Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting professional pet care is simple with our 4-step process. 
            From booking to service completion, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-card shadow-card hover:shadow-soft transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="w-8 h-1 bg-primary rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};