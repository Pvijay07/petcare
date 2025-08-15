import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Eye, MessageCircle, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";

// Mock data - this would come from your backend
const requests = [
  {
    id: "1",
    service: "Dog Walking",
    package: "Standard Walk",
    petName: "Buddy",
    date: "2024-01-20",
    time: "2:00 PM",
    location: "Downtown Park",
    status: "pending",
    bidCount: 3,
    totalCost: 35,
    createdAt: "2024-01-15"
  },
  {
    id: "2", 
    service: "Pet Grooming",
    package: "Full Groom",
    petName: "Luna",
    date: "2024-01-22",
    time: "10:00 AM",
    location: "Home Visit",
    status: "active",
    bidCount: 5,
    totalCost: 65,
    createdAt: "2024-01-14",
    selectedProvider: "Sarah's Pet Care",
    providerRating: 4.9
  },
  {
    id: "3",
    service: "Pet Training", 
    package: "Basic Training",
    petName: "Max",
    date: "2024-01-10",
    time: "4:00 PM",
    location: "Sunset Dog Park",
    status: "completed",
    bidCount: 4,
    totalCost: 60,
    createdAt: "2024-01-08",
    selectedProvider: "Mike's Training Academy",
    providerRating: 4.8,
    completedAt: "2024-01-10"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-warning text-warning-foreground";
    case "active": return "bg-primary text-primary-foreground";
    case "completed": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending": return "Awaiting Bids";
    case "active": return "Service Confirmed";
    case "completed": return "Completed";
    default: return status;
  }
};

export default function MyRequests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const filteredRequests = requests.filter(request => {
    if (activeTab === "all") return true;
    return request.status === activeTab;
  });

  const handleViewBids = (requestId: string) => {
    navigate(`/requests/${requestId}/bids`);
  };

  const handleTrackService = (requestId: string) => {
    navigate(`/requests/${requestId}/track`);
  };

  const handleViewDetails = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Service Requests</h1>
          <Button onClick={() => navigate("/")}>
            Book New Service
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({requests.filter(r => r.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({requests.filter(r => r.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({requests.filter(r => r.status === "completed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredRequests.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">No requests found in this category.</p>
                  <Button onClick={() => navigate("/")}>
                    Book Your First Service
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-soft transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{request.service}</CardTitle>
                          <p className="text-muted-foreground">{request.package} for {request.petName}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.location}</span>
                        </div>
                      </div>

                      {request.selectedProvider && (
                        <div className="mb-4 p-3 bg-muted rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Provider: {request.selectedProvider}</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-warning text-warning" />
                                <span className="text-sm">{request.providerRating}</span>
                              </div>
                            </div>
                            <p className="text-lg font-bold text-primary">${request.totalCost}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(request.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>

                        {request.status === "pending" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewBids(request.id)}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            View Bids ({request.bidCount})
                          </Button>
                        )}

                        {request.status === "active" && (
                          <Button 
                            size="sm"
                            onClick={() => handleTrackService(request.id)}
                          >
                            Track Service
                          </Button>
                        )}

                        {request.status === "completed" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/requests/${request.id}/review`)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            Review Service
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}