import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { PremiumComparison } from "@/components/PremiumComparison";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X, Sparkles, AlertCircle } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Premium() {
  const { createCheckout, subscribed, loading: subscriptionLoading } = useSubscription();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const isLoading = authLoading || subscriptionLoading;

  const handleGetPremium = async () => {
    if (!user) {
      navigate("/auth");
      toast.info("Please sign in to subscribe");
      return;
    }
    
    if (subscribed) {
      toast.info("You're already a premium member!");
      return;
    }

    try {
      await createCheckout();
    } catch (error) {
      toast.error("Failed to start checkout. Please try again.");
      console.error("Checkout error:", error);
    }
  };

  const features = [
    {
      name: "Dog Vision Simulations",
      free: "10 per day",
      premium: "Unlimited",
    },
    {
      name: "Photo Gallery Storage",
      free: "Not available",
      premium: "Save & organize unlimited photos",
    },
    {
      name: "Retinal Mode Options",
      free: "Basic mode only",
      premium: "All advanced retinal modes",
    },
    {
      name: "Breed-Specific Filters",
      free: "Limited breeds",
      premium: "All dog breeds",
    },
    {
      name: "Export Quality",
      free: "Standard resolution",
      premium: "High-resolution exports",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100">
      <SEO
        title="Premium Features"
        description="Unlock unlimited dog vision simulations, advanced breed filters, and priority support with My Doggles Premium for $4.99/month."
        canonical="/premium"
      />
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-8">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-[600px] mx-auto mb-4" />
              <Skeleton className="h-4 w-[500px] mx-auto mb-8" />
              <Skeleton className="h-12 w-48 mx-auto" />
            </div>
            <Skeleton className="h-[400px] w-full" />
            <div className="grid lg:grid-cols-3 gap-8">
              <Skeleton className="lg:col-span-2 h-[600px]" />
              <Skeleton className="h-[400px]" />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-black text-blue-700 mb-4">Premium Features</h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
                Unlock extra features to get more from My Doggles
              </p>
              <Button 
                onClick={handleGetPremium}
                size="lg"
                className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                <Sparkles className="mr-2" size={24} />
                {subscribed ? "You're Premium!" : "Get Premium Now"}
              </Button>
            </div>

            {/* Interactive Comparison Slider */}
            <div className="mb-12">
              <PremiumComparison />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Free vs Premium Comparison</CardTitle>
                    <CardDescription>See what you get with a premium subscription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                            <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Free</th>
                            <th className="text-center py-4 px-4 font-semibold text-primary bg-primary/5">Premium</th>
                          </tr>
                        </thead>
                        <tbody>
                          {features.map((feature, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-4 px-4 font-medium text-foreground">{feature.name}</td>
                              <td className="py-4 px-4 text-center text-muted-foreground text-sm">
                                {feature.free.includes("Not available") ? (
                                  <X className="inline text-destructive" size={20} />
                                ) : (
                                  feature.free
                                )}
                              </td>
                              <td className="py-4 px-4 text-center bg-primary/5">
                                <div className="flex items-center justify-center gap-2">
                                  <Check className="text-primary" size={20} />
                                  <span className="text-sm font-medium">{feature.premium}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

              </div>

              <div>
                <SubscriptionCard />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
