import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Navbar } from "@/components/Navbar";

export default function Success() {
  const navigate = useNavigate();
  const { checkSubscription } = useSubscription();

  useEffect(() => {
    // Refresh subscription status after successful payment
    checkSubscription();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for subscribing to Premium
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Your subscription is now active. You can now access all premium features!
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button onClick={() => navigate("/")} className="w-full">
              Go to Home
            </Button>
            <Button onClick={() => navigate("/camera")} variant="outline" className="w-full">
              Try Dog Vision Camera
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
