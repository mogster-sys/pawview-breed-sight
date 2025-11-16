import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Loader2 } from "lucide-react";

export function SubscriptionCard() {
  const { subscribed, subscriptionEnd, loading, createCheckout, openCustomerPortal, checkSubscription } = useSubscription();

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Premium Subscription</CardTitle>
          {subscribed && <Badge variant="default">Active</Badge>}
        </div>
        <CardDescription>
          {subscribed
            ? `Your subscription is active${subscriptionEnd ? ` until ${new Date(subscriptionEnd).toLocaleDateString()}` : ""}`
            : "Get access to premium features with a monthly subscription"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Premium Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Unlimited dog vision simulations</li>
              <li>Save photos to gallery</li>
              <li>Advanced retinal mode options</li>
              <li>Priority support</li>
            </ul>
          </div>
          <div className="text-2xl font-bold">$4.99/month</div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {subscribed ? (
          <>
            <Button onClick={openCustomerPortal} className="w-full">
              Manage Subscription
            </Button>
            <Button onClick={checkSubscription} variant="outline" className="w-full">
              Refresh Status
            </Button>
          </>
        ) : (
          <Button onClick={createCheckout} className="w-full">
            Subscribe Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
