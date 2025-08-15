import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, Clock, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { DateTimePicker } from "@/components/DateTimePicker";
import { toast } from "@/hooks/use-toast";

const addOns = {
  walking: [
    { id: "treats", name: "Premium Treats", price: 5, description: "High-quality treats for good behavior" },
    { id: "extra-photos", name: "Extra Photos", price: 8, description: "Additional photo updates every 10 minutes" },
    { id: "poop-bags", name: "Eco-Friendly Poop Bags", price: 3, description: "Biodegradable waste bags" },
    { id: "extended-time", name: "Extended Time (+15 min)", price: 12, description: "Add 15 minutes to your walk" }
  ],
  grooming: [
    { id: "nail-polish", name: "Nail Polish", price: 10, description: "Pet-safe nail polish in various colors" },
    { id: "teeth-brushing", name: "Teeth Brushing", price: 15, description: "Professional dental cleaning" },
    { id: "flea-treatment", name: "Flea Treatment", price: 20, description: "Preventive flea and tick treatment" },
    { id: "aromatherapy", name: "Aromatherapy", price: 12, description: "Calming lavender aromatherapy session" }
  ],
  training: [
    { id: "video-session", name: "Video Recording", price: 15, description: "Record training session for review" },
    { id: "training-toys", name: "Training Toys", price: 25, description: "Professional training equipment included" },
    { id: "behavior-report", name: "Detailed Behavior Report", price: 10, description: "Comprehensive behavioral analysis" },
    { id: "follow-up", name: "Follow-up Call", price: 20, description: "30-minute phone consultation after training" }
  ],
  boarding: [
    { id: "webcam", name: "Live Webcam Access", price: 15, description: "24/7 webcam access to check on your pet" },
    { id: "grooming", name: "Mini Grooming Session", price: 30, description: "Basic grooming during stay" },
    { id: "exercise", name: "Extra Exercise Time", price: 18, description: "Additional playtime and exercise" },
    { id: "medication", name: "Medication Administration", price: 12, description: "Professional medication management" }
  ]
};

export default function BookingForm() {
  const { serviceId, packageId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    petName: "",
    petBreed: "",
    petAge: "",
    petWeight: "",
    specialNeeds: "",
    address: "",
    instructions: "",
    selectedDate: null as Date | null,
    selectedTime: "",
    selectedAddOns: [] as string[]
  });

  const serviceAddOns = addOns[serviceId as keyof typeof addOns] || [];

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedAddOns: checked 
        ? [...prev.selectedAddOns, addOnId]
        : prev.selectedAddOns.filter(id => id !== addOnId)
    }));
  };

  const calculateTotal = () => {
    const basePrice = getPackagePrice();
    const addOnTotal = formData.selectedAddOns.reduce((total, addOnId) => {
      const addOn = serviceAddOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return basePrice + addOnTotal;
  };

  const getPackagePrice = () => {
    // This would normally come from your service data
    const prices = { basic: 25, standard: 35, premium: 50 };
    return prices[packageId as keyof typeof prices] || 25;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.petName || !formData.selectedDate || !formData.selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Store booking data and navigate to summary
    sessionStorage.setItem('bookingData', JSON.stringify({
      ...formData,
      serviceId,
      packageId,
      total: calculateTotal()
    }));
    
    navigate('/booking/summary');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/service/${serviceId}`)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Service Details
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Book Your Service</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Pet Information */}
            <Card>
              <CardHeader>
                <CardTitle>Pet Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petName">Pet Name *</Label>
                    <Input
                      id="petName"
                      value={formData.petName}
                      onChange={(e) => setFormData(prev => ({ ...prev, petName: e.target.value }))}
                      placeholder="Enter your pet's name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="petBreed">Breed</Label>
                    <Input
                      id="petBreed"
                      value={formData.petBreed}
                      onChange={(e) => setFormData(prev => ({ ...prev, petBreed: e.target.value }))}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, petAge: e.target.value }))}
                      placeholder="e.g., 3 years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="petWeight">Weight</Label>
                    <Input
                      id="petWeight"
                      value={formData.petWeight}
                      onChange={(e) => setFormData(prev => ({ ...prev, petWeight: e.target.value }))}
                      placeholder="e.g., 25 lbs"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialNeeds">Special Needs or Medical Conditions</Label>
                  <Textarea
                    id="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialNeeds: e.target.value }))}
                    placeholder="Any allergies, medical conditions, or special requirements..."
                    className="h-20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DateTimePicker
                  selectedDate={formData.selectedDate}
                  selectedTime={formData.selectedTime}
                  onDateChange={(date) => setFormData(prev => ({ ...prev, selectedDate: date }))}
                  onTimeChange={(time) => setFormData(prev => ({ ...prev, selectedTime: time }))}
                />
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Service Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter the service address"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add-ons & Extras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {serviceAddOns.map((addOn) => (
                    <div key={addOn.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                      <Checkbox
                        id={addOn.id}
                        checked={formData.selectedAddOns.includes(addOn.id)}
                        onCheckedChange={(checked) => handleAddOnChange(addOn.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <label htmlFor={addOn.id} className="font-medium cursor-pointer">
                          {addOn.name} (+${addOn.price})
                        </label>
                        <p className="text-sm text-muted-foreground">{addOn.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Special Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Any special instructions for the service provider..."
                  className="h-24"
                />
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Base Price:</span>
                  <span className="text-lg">${getPackagePrice()}</span>
                </div>
                {formData.selectedAddOns.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {formData.selectedAddOns.map(addOnId => {
                      const addOn = serviceAddOns.find(a => a.id === addOnId);
                      return addOn ? (
                        <div key={addOnId} className="flex justify-between text-muted-foreground">
                          <span>{addOn.name}:</span>
                          <span>+${addOn.price}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full md:w-auto">
              Continue to Summary
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}