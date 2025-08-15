import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, Clock, Plus, ChevronDown, ChevronUp, MapPin, User } from "lucide-react";
import { Header } from "@/components/Header";
import { DateTimePicker } from "@/components/DateTimePicker";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for previously saved pets and addresses
const savedPets = [
  { id: "1", name: "Max", breed: "Golden Retriever", age: "3 years", weight: "65 lbs", specialNeeds: "Allergic to chicken" },
  { id: "2", name: "Bella", breed: "Siamese Cat", age: "5 years", weight: "8 lbs", specialNeeds: "None" },
];

const savedAddresses = [
  { id: "1", name: "Home", address: "123 Main St, Apt 4B, New York, NY 10001", instructions: "Ring doorbell twice" },
  { id: "2", name: "Work", address: "456 Business Ave, Floor 12, New York, NY 10005", instructions: "Front desk will let you in" },
];

const addOns = {
  walking: [
    { id: "treats", name: "Premium Treats", price: 5, description: "High-quality treats for good behavior" },
    { id: "extra-photos", name: "Extra Photos", price: 8, description: "Additional photo updates every 10 minutes" },
    { id: "poop-bags", name: "Eco-Friendly Poop Bags", price: 3, description: "Biodegradable waste bags" },
    { id: "extended-time", name: "Extended Time (+15 min)", price: 12, description: "Add 15 minutes to your walk" }
  ],
  // ... other service add-ons
};

// Time slot generator based on duration
const generateTimeSlots = (duration: number) => {
  const slots = [];
  const startHour = 8; // 8 AM
  const endHour = 20; // 8 PM
  const interval = duration;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }

  return slots;
};

export default function BookingForm() {
  const { serviceId, packageId } = useParams();
  const navigate = useNavigate();
  
  // Determine duration based on packageId
  const getDuration = () => {
    switch(packageId) {
      case '30min': return 30;
      case '45min': return 45;
      case '60min': return 60;
      default: return 30;
    }
  };

  const duration = getDuration();
  const timeSlots = generateTimeSlots(duration);

  const [formData, setFormData] = useState({
    petName: "",
    petBreed: "",
    petAge: "",
    petWeight: "",
    specialNeeds: "",
    address: "",
    addressName: "",
    instructions: "",
    selectedDate: null as Date | null,
    selectedTime: "",
    selectedAddOns: [] as string[],
    selectedPet: "",
    selectedAddress: ""
  });

  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const serviceAddOns = addOns[serviceId as keyof typeof addOns] || [];

  useEffect(() => {
    const savedData = sessionStorage.getItem('bookingDraft');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // ... other handlers remain the same ...

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Book Your {duration}-Minute Walk</h1>
          <p className="text-muted-foreground mb-8">Complete the form below to schedule your pet's walk</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Pet Information */}
            {/* ... pet information section remains the same ... */}

            {/* Enhanced Date & Time Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule Your Walk
                </CardTitle>
                <CardDescription>
                  Select a date and available time slot for your {duration}-minute walk
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Select Date</Label>
                    <DateTimePicker
                      selectedDate={formData.selectedDate}
                      onDateChange={(date) => {
                        setFormData(prev => ({ 
                          ...prev, 
                          selectedDate: date,
                          selectedTime: "" // Reset time when date changes
                        }));
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label>Available Time Slots</Label>
                    {formData.selectedDate ? (
                      <Select
                        value={formData.selectedTime}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, selectedTime: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time} - {getEndTime(time, duration)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="text-sm text-muted-foreground p-3 border rounded-md">
                        Please select a date first to see available time slots
                      </div>
                    )}
                  </div>
                </div>
                
                {formData.selectedTime && (
                  <div className="text-sm text-green-600 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>
                      Selected: {formData.selectedDate?.toLocaleDateString()} at {formData.selectedTime} - {getEndTime(formData.selectedTime, duration)} ({duration} mins)
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ... rest of the form remains the same ... */}
          </form>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate end time
function getEndTime(startTime: string, duration: number) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  date.setMinutes(date.getMinutes() + duration);
  
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}