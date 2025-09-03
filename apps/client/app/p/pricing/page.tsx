import { Zap, MessageSquare, Clock, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingPage() {
  // Convert 150 INR to USD (approximate conversion rate)
  const priceINR = 150;
  const conversionRate = 0.012; // 1 INR ≈ 0.012 USD
  const priceUSD = (priceINR * conversionRate).toFixed(2);

  const features = [
    {
      icon: MessageSquare,
      text: "Unlimited messages with our AI assistant",
    },
    {
      icon: Clock,
      text: "24/7 access to ChatGPT capabilities",
    },
    {
      icon: Shield,
      text: "Secure and private conversations",
    },
    {
      icon: Zap,
      text: "Fast response times",
    },
    {
      icon: Star,
      text: "Priority access to new features",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get full access to all ChatGPT features with our affordable single
            plan. No hidden fees, no complicated tiers.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
              <CardDescription>
                Everything you need for AI-powered conversations
              </CardDescription>

              <div className="mt-6">
                <div className="flex justify-center items-baseline">
                  <span className="text-4xl font-bold">${priceUSD}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Approximately ₹{priceINR} (INR)
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button className="w-full py-6 text-lg" size="lg">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center text-muted-foreground">
          <p className="text-sm">
            No hidden fees. Cancel anytime. 7-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
