import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, MapPin, Calendar, Clock, User, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { toast } from "@/hooks/use-toast";

interface BookingData {
  petName: string;
  petBreed: string;
  petAge: string;
  petWeight: string;
  specialNeeds: string;
  address: string;
  instructions: string;
  selectedDate: string;
  selectedTime: string;
  selectedAddOns: string[];
  serviceId: string;
  packageId: string;
  total: number;
}

const addOnNames = {
  treats: "Premium Treats",
  "extra-photos": "Extra Photos",
  "poop-bags": "Eco-Friendly Poop Bags",
  "extended-time": "Extended Time (+15 min)",
  "nail-polish": "Nail Polish",
  "teeth-brushing": "Teeth Brushing",
  "flea-treatment": "Flea Treatment",
  aromatherapy: "Aromatherapy",
  "video-session": "Video Recording",
  "training-toys": "Training Toys",
  "behavior-report": "Detailed Behavior Report",
  "follow-up": "Follow-up Call",
  webcam: "Live Webcam Access",
  grooming: "Mini Grooming Session",
  exercise: "Extra Exercise Time",
  medication: "Medication Administration"
};

export default function BookingSummary() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmitRequest = async () => {
    if (!acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request Submitted Successfully!",
        description: "Providers will start bidding on your request. You'll be notified when bids are received.",
      });
      
      // Clear booking data and navigate to requests page
      sessionStorage.removeItem('bookingData');
      navigate('/requests');
      setIsSubmitting(false);
    }, 2000);
  };

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getServiceTitle = (serviceId: string) => {
    const titles = {
      walking: "Dog Walking",
      grooming: "Pet Grooming", 
      training: "Pet Training",
      boarding: "Pet Boarding"
    };
    return titles[serviceId as keyof typeof titles] || serviceId;
  };

  const getPackageName = (packageId: string) => {
    const names = {
      basic: "Basic Package",
      standard: "Standard Package",
      premium: "Premium Package"
    };
    return names[packageId as keyof typeof names] || packageId;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Booking Form
        </Button>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Booking Summary</h1>
          
          <div className="space-y-6">
            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">{getServiceTitle(bookingData.serviceId)}</p>
                    <p className="text-muted-foreground">{getPackageName(bookingData.packageId)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${bookingData.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pet Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Pet Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Name: {bookingData.petName}</p>
                    {bookingData.petBreed && <p className="text-muted-foreground">Breed: {bookingData.petBreed}</p>}
                  </div>
                  <div>
                    {bookingData.petAge && <p className="text-muted-foreground">Age: {bookingData.petAge}</p>}
                    {bookingData.petWeight && <p className="text-muted-foreground">Weight: {bookingData.petWeight}</p>}
                  </div>
                </div>
                {bookingData.specialNeeds && (
                  <div>
                    <p className="font-medium">Special Needs:</p>
                    <p className="text-muted-foreground">{bookingData.specialNeeds}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Schedule & Location */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(bookingData.selectedDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingData.selectedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingData.address}</span>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            {bookingData.selectedAddOns.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Add-ons</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {bookingData.selectedAddOns.map((addOnId) => (
                      <li key={addOnId} className="flex items-center gap-2">
                        <span>• {addOnNames[addOnId as keyof typeof addOnNames] || addOnId}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            {bookingData.instructions && (
              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{bookingData.instructions}</p>
                </CardContent>
              </Card>
            )}

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <div>
                    <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                      I accept the terms and conditions
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      By submitting this request, you agree to our service terms, cancellation policy, and payment terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notice */}
            <Card className="border-warning bg-warning/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-warning">How it works</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      After submitting your request, local service providers will review and submit bids. 
                      You'll receive notifications as bids come in, and you can compare providers before making your final selection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={handleSubmitRequest}
                disabled={isSubmitting}
                className="w-full md:w-auto px-12"
              >
                {isSubmitting ? "Submitting..." : "Submit Service Request"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}