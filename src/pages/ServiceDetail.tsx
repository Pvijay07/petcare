import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/Header";
import groomingImage from "@/assets/service-grooming.jpg";
import trainingImage from "@/assets/service-training.jpg";
import boardingImage from "@/assets/service-boarding.jpg";
import heroImage from "@/assets/hero-dog-walking.jpg";

const serviceData = {
  walking: {
    title: "Dog Walking",
    description: "Professional dog walking services with GPS tracking and photo updates during each walk.",
    image: heroImage,
    rating: 4.9,
    reviews: 127,
    location: "2.1 mi away",
    duration: "30-60 min",
    providers: 15,
    packages: [
      {
        id: "basic",
        name: "Basic Walk",
        price: 25,
        duration: "30 min",
        features: ["30-minute walk", "GPS tracking", "Photo updates", "Basic report"]
      },
      {
        id: "standard",
        name: "Standard Walk",
        price: 35,
        duration: "45 min",
        features: ["45-minute walk", "GPS tracking", "Photo & video updates", "Detailed report", "Playtime"]
      },
      {
        id: "premium",
        name: "Premium Walk",
        price: 50,
        duration: "60 min",
        features: ["60-minute walk", "GPS tracking", "Photo & video updates", "Detailed report", "Extended playtime", "Treat included"]
      }
    ]
  },
  grooming: {
    title: "Pet Grooming",
    description: "Full-service grooming including bath, haircut, nail trimming, and teeth cleaning.",
    image: groomingImage,
    rating: 4.8,
    reviews: 98,
    location: "1.5 mi away",
    duration: "2-3 hours",
    providers: 8,
    packages: [
      {
        id: "basic",
        name: "Basic Groom",
        price: 45,
        duration: "1.5 hours",
        features: ["Bath & dry", "Basic brush", "Nail trim", "Ear cleaning"]
      },
      {
        id: "standard",
        name: "Full Groom",
        price: 65,
        duration: "2.5 hours",
        features: ["Bath & dry", "Haircut/styling", "Nail trim", "Ear cleaning", "Teeth brushing", "Cologne spray"]
      },
      {
        id: "premium",
        name: "Luxury Spa",
        price: 95,
        duration: "3 hours",
        features: ["Bath & dry", "Premium haircut", "Nail trim & polish", "Ear cleaning", "Teeth brushing", "Cologne spray", "Bow tie/bandana"]
      }
    ]
  },
  training: {
    title: "Pet Training",
    description: "Personalized training sessions for obedience, tricks, and behavioral correction.",
    image: trainingImage,
    rating: 4.9,
    reviews: 156,
    location: "3.2 mi away",
    duration: "1 hour",
    providers: 12,
    packages: [
      {
        id: "basic",
        name: "Basic Training",
        price: 60,
        duration: "45 min",
        features: ["Basic commands", "Leash training", "Progress report", "Homework exercises"]
      },
      {
        id: "standard",
        name: "Advanced Training",
        price: 80,
        duration: "60 min",
        features: ["Advanced commands", "Behavioral correction", "Trick training", "Progress report", "Training materials"]
      },
      {
        id: "premium",
        name: "Elite Training",
        price: 120,
        duration: "90 min",
        features: ["Comprehensive training", "Behavioral analysis", "Custom training plan", "Progress tracking", "Training materials", "Follow-up support"]
      }
    ]
  },
  boarding: {
    title: "Pet Boarding",
    description: "Safe and comfortable overnight boarding with 24/7 supervision and daily updates.",
    image: boardingImage,
    rating: 4.7,
    reviews: 89,
    location: "4.1 mi away",
    duration: "Per night",
    providers: 6,
    packages: [
      {
        id: "basic",
        name: "Standard Stay",
        price: 40,
        duration: "Per night",
        features: ["Comfortable accommodation", "2 meals per day", "Daily photo update", "Basic playtime"]
      },
      {
        id: "standard",
        name: "Comfort Stay",
        price: 50,
        duration: "Per night",
        features: ["Premium accommodation", "3 meals per day", "Multiple photo updates", "Extended playtime", "Bedtime story"]
      },
      {
        id: "premium",
        name: "Luxury Suite",
        price: 75,
        duration: "Per night",
        features: ["Luxury suite", "Gourmet meals", "Video updates", "Personal attention", "Spa treatment", "Take-home treats"]
      }
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const service = serviceData[serviceId as keyof typeof serviceData];
  
  if (!service) {
    return <div>Service not found</div>;
  }

  const handleBookService = (packageId: string) => {
    navigate(`/booking/${serviceId}/${packageId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{service.title}</h1>
            <p className="text-muted-foreground mb-6 text-lg">{service.description}</p>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="font-semibold">{service.rating}</span>
                <span className="text-muted-foreground">({service.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{service.location}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{service.duration}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{service.providers} providers</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Choose Your Package</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {service.packages.map((pkg, index) => (
              <Card key={pkg.id} className={`relative ${index === 1 ? 'ring-2 ring-primary' : ''}`}>
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">${pkg.price}</div>
                  <div className="text-muted-foreground mb-4">{pkg.duration}</div>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={index === 1 ? "default" : "outline"}
                    onClick={() => handleBookService(pkg.id)}
                  >
                    Book {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}