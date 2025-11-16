import { Navbar } from "@/components/Navbar";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function Premium() {
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
      name: "Support Priority",
      free: "Community support",
      premium: "Priority email support",
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
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-blue-700 mb-4">Premium Features</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Unlock the full potential of My Doggles with unlimited simulations, advanced features, and priority support
          </p>
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

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="text-primary" />
                    Unlimited Creativity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No daily limits means you can explore dog vision for every photo, every moment, without restrictions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="text-primary" />
                    Advanced Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access all retinal modes and breed-specific filters for the most accurate dog vision simulation available.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <SubscriptionCard />
          </div>
        </div>
      </div>
    </div>
  );
}
