import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent
} from "@/components/ui/accordion";
import {
  RadioGroup, RadioGroupItem
} from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Check, PawPrint, Bone, Dog, Zap, Calendar, Clock, Heart,
  User, Plus, ChevronUp
} from "lucide-react";

interface WalkingServiceCardsProps {
  serviceId: string;
}

/* ---------- Constants ---------- */
const commonFeatures = [
  "GPS tracking & updates",
  "Professional pet care",
  "Photo updates after walk",
  "Flexible scheduling",
];

const durations = [
  { id: "30min", name: "Quick Stroll (30min)", basePrice: 25, icon: <PawPrint className="h-7 w-7 text-blue-500" />, isPopular: false },
  { id: "45min", name: "Standard Walk (45min)", basePrice: 35, icon: <Bone className="h-7 w-7 text-orange-500" />, isPopular: true },
  { id: "60min", name: "Extended Walk (60min)", basePrice: 50, icon: <Dog className="h-7 w-7 text-purple-500" />, isPopular: false },
];

const scheduleOptions = {
  weekdays: { days: 5, label: "Weekdays", multiplier: 1, icon: <Calendar className="h-4 w-4" /> },
  weekends: { days: 2, label: "Weekends", multiplier: 1.2, icon: <Heart className="h-4 w-4" /> },
  everyday: { days: 7, label: "Daily", multiplier: 0.9, icon: <Zap className="h-4 w-4" /> },
} as const;

type ScheduleKey = keyof typeof scheduleOptions;

const savedPets = [
  { id: "1", name: "Max", breed: "Golden Retriever", age: "3 years", weight: "65 lbs", specialNeeds: "Allergic to chicken", image: "" },
  { id: "2", name: "Bella", breed: "Siamese Cat", age: "5 years", weight: "8 lbs", specialNeeds: "None", image: "" },
];

/* ---------- Component ---------- */
const WalkingServiceCards: React.FC<WalkingServiceCardsProps> = ({ serviceId }) => {
  const navigate = useNavigate();

  // Global selectors (applies to all packages)
  const [schedule, setSchedule] = useState<ScheduleKey>("weekdays");
  const [walksPerDay, setWalksPerDay] = useState<number>(1);

  // Pet info
  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [formData, setFormData] = useState({
    selectedPet: "",
    petName: "",
    petBreed: "",
    petAge: "",
    petWeight: "",
    specialNeeds: "",
  });

  const handlePetSelection = (petId: string) => {
    const selected = savedPets.find((p) => p.id === petId);
    if (selected) {
      setSelectedPet(petId);
      setFormData((prev) => ({
        ...prev,
        selectedPet: petId,
        petName: selected.name,
        petBreed: selected.breed,
        petAge: selected.age,
        petWeight: selected.weight,
        specialNeeds: selected.specialNeeds,
      }));
    }
  };

  // Price calculator (keeps your original logic)
  const calculateWalkingPrice = (basePrice: number) => {
    const sched = scheduleOptions[schedule];
    const totalWalks = sched.days * walksPerDay;
    const adjustedPrice = basePrice * totalWalks * sched.multiplier;
    return {
      weeklyPrice: Math.round(adjustedPrice),
      pricePerWalk: Math.round((adjustedPrice / totalWalks) * 100) / 100,
      totalWalks,
    };
  };

  const getDiscountInfo = useMemo(() => {
    if (schedule === "everyday") return { text: "10% OFF", color: "bg-green-500" };
    if (schedule === "weekends") return { text: "Weekend +20%", color: "bg-amber-500" };
    return null;
  }, [schedule]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* ---------- Pet Information ---------- */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Pet Information
          </CardTitle>
          <CardDescription>
            Select a previously saved pet or add a new one
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Saved Pets (visual selector) */}
          <div>
            <div className="mb-3 text-sm font-medium">Saved Pets</div>
            <div className="flex gap-4 overflow-x-auto pb-1">
              {savedPets.map((pet) => (
                <motion.button
                  key={pet.id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  className={`min-w-[180px] flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    selectedPet === pet.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handlePetSelection(pet.id)}
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {pet.image ? (
                      <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                    ) : (
                      <Dog className="text-muted-foreground" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{pet.name}</div>
                    <div className="text-xs text-muted-foreground">{pet.breed}</div>
                  </div>
                  {selectedPet === pet.id && (
                    <Badge variant="secondary" className="ml-auto">Selected</Badge>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Saved Pets (Accordion + RadioGroup for accessibility & details) */}
          <Accordion type="single" collapsible>
            <AccordionItem value="saved-pets">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>Select from saved pets (detailed)</span>
                  {formData.selectedPet && <Badge variant="secondary">Selected</Badge>}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={formData.selectedPet}
                  onValueChange={handlePetSelection}
                  className="space-y-3"
                >
                  {savedPets.map((pet) => (
                    <div
                      key={pet.id}
                      className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 ${
                        selectedPet === pet.id ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value={pet.id} id={`pet-${pet.id}`} />
                      <div className="flex-1">
                        <label htmlFor={`pet-${pet.id}`} className="font-medium cursor-pointer">
                          {pet.name} ({pet.breed})
                        </label>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>Age: {pet.age} • Weight: {pet.weight}</p>
                          {pet.specialNeeds && <p>Special Needs: {pet.specialNeeds}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Toggle New Pet Form */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowNewPetForm((s) => !s)}
            className="w-full"
          >
            {showNewPetForm ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide new pet form
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add new pet
              </>
            )}
          </Button>

          {/* New Pet Form */}
          {showNewPetForm && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="petName">Pet Name *</Label>
                  <Input
                    id="petName"
                    value={formData.petName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, petName: e.target.value }))}
                    placeholder="Enter your pet's name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="petBreed">Breed</Label>
                  <Input
                    id="petBreed"
                    value={formData.petBreed}
                    onChange={(e) => setFormData((prev) => ({ ...prev, petBreed: e.target.value }))}
                    placeholder="e.g., Golden Retriever"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="petAge">Age</Label>
                  <Input
                    id="petAge"
                    value={formData.petAge}
                    onChange={(e) => setFormData((prev) => ({ ...prev, petAge: e.target.value }))}
                    placeholder="e.g., 3 years"
                  />
                </div>
                <div>
                  <Label htmlFor="petWeight">Weight</Label>
                  <Input
                    id="petWeight"
                    value={formData.petWeight}
                    onChange={(e) => setFormData((prev) => ({ ...prev, petWeight: e.target.value }))}
                    placeholder="e.g., 25 lbs"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="specialNeeds">Special Needs or Medical Conditions</Label>
                <Textarea
                  id="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={(e) => setFormData((prev) => ({ ...prev, specialNeeds: e.target.value }))}
                  placeholder="Any allergies, medical conditions, or special requirements..."
                  className="h-20"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ---------- Sticky Global Selector ---------- */}
      <div className="sticky top-2 z-40 bg-background shadow-lg rounded-lg p-4 border border-border">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Schedule */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Calendar className="h-4 w-4 text-primary" /> Schedule
            </label>
            <div className="flex gap-2">
              {Object.entries(scheduleOptions).map(([key, s]) => (
                <Button
                  key={key}
                  variant={schedule === key ? "default" : "outline"}
                  onClick={() => setSchedule(key as ScheduleKey)}
                  className="flex-1 rounded-full"
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Walks per Day */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Clock className="h-4 w-4 text-primary" /> Walks per day
            </label>
            <div className="flex gap-2">
              {[1, 2].map((walks) => (
                <Button
                  key={walks}
                  variant={walksPerDay === walks ? "default" : "outline"}
                  onClick={() => setWalksPerDay(walks)}
                  className="flex-1 rounded-full"
                >
                  {walks} Walk{walks > 1 ? "s" : ""}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Packages ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {durations.map((duration, index) => {
          const pricing = calculateWalkingPrice(duration.basePrice);
          const discount = getDiscountInfo;

          return (
            <motion.div
              key={duration.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] 
                ${duration.isPopular ? "border-primary ring-1 ring-primary shadow-lg" : "border-border hover:shadow-md"}`}
              >
                {/* Popular & Discount */}
                {duration.isPopular && (
                  <div className="absolute -top-2 -right-8 w-32 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold py-1 text-center rotate-45 shadow-md">
                    Popular
                  </div>
                )}
                {discount && (
                  <Badge className={`absolute top-3 left-3 ${discount.color} text-white shadow-sm`}>
                    {discount.text}
                  </Badge>
                )}

                <CardHeader className="pb-3 text-center">
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mx-auto p-3 rounded-full bg-primary/10"
                  >
                    {duration.icon}
                  </motion.div>
                  <CardTitle className="mt-3 text-lg font-semibold">{duration.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {pricing.totalWalks} walks/week • ₹{pricing.pricePerWalk.toFixed(2)} per walk
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center">
                  <motion.div
                    key={`${pricing.weeklyPrice}-${schedule}-${walksPerDay}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-primary"
                  >
                    ₹{pricing.weeklyPrice}
                    <span className="text-sm text-muted-foreground"> /week</span>
                  </motion.div>

                  <Button
                    className="w-full mt-4"
                    size="lg"
                    variant={duration.isPopular ? "default" : "outline"}
                    disabled={!selectedPet && !formData.petName}
                    onClick={() =>
                      navigate(
                        `/booking/${serviceId}/${duration.id}?walks=${walksPerDay}&schedule=${schedule}` +
                        `&petId=${selectedPet || ""}&petName=${encodeURIComponent(formData.petName || "")}`
                      )
                    }
                  >
                    {selectedPet || formData.petName ? "Select" : "Select/Add Pet First"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* ---------- Features ---------- */}
      <div className="mt-2 bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">All packages include:</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {commonFeatures.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" /> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WalkingServiceCards;
