import { ServiceCard } from "./ServiceCard";
import groomingImage from "@/assets/service-grooming.jpg";
import trainingImage from "@/assets/service-training.jpg";
import boardingImage from "@/assets/service-boarding.jpg";
import heroImage from "@/assets/hero-dog-walking.jpg";

const services = [
  {
    id: "walking",
    title: "Dog Walking",
    description: "Professional dog walking services with GPS tracking and photo updates during each walk.",
    image: heroImage,
    price: "$25",
    duration: "30-60 min",
    rating: 4.9,
    location: "2.1 mi",
    isPopular: true,
  },
  {
    id: "grooming",
    title: "Pet Grooming",
    description: "Full-service grooming including bath, haircut, nail trimming, and teeth cleaning.",
    image: groomingImage,
    price: "$65",
    duration: "2-3 hours",
    rating: 4.8,
    location: "1.5 mi",
  },
  {
    id: "training",
    title: "Pet Training",
    description: "Personalized training sessions for obedience, tricks, and behavioral correction.",
    image: trainingImage,
    price: "$80",
    duration: "1 hour",
    rating: 4.9,
    location: "3.2 mi",
  },
  {
    id: "boarding",
    title: "Pet Boarding",
    description: "Safe and comfortable overnight boarding with 24/7 supervision and daily updates.",
    image: boardingImage,
    price: "$50",
    duration: "Per night",
    rating: 4.7,
    location: "4.1 mi",
    isPopular: true,
  },
];

export const ServicesGrid = () => {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Pet Care Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of professional pet services. 
            All providers are vetted, insured, and passionate about pet care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};