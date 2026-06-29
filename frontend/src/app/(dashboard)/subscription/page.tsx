import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Crown, Building2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Zap,
    description: "Get started with basic access",
    features: [
      { text: "5 lab machines per month", included: true },
      { text: "Basic challenges", included: true },
      { text: "Community access", included: true },
      { text: "1 learning path", included: true },
      { text: "Premium labs", included: false },
      { text: "Priority support", included: false },
      { text: "Team features", included: false },
      { text: "Custom labs", included: false },
    ],
    cta: "Current Plan",
    variant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$14",
    period: "/month",
    icon: Crown,
    description: "For serious security learners",
    features: [
      { text: "Unlimited lab machines", included: true },
      { text: "All challenges", included: true },
      { text: "Community access", included: true },
      { text: "All learning paths", included: true },
      { text: "Premium & retired labs", included: true },
      { text: "Priority support", included: true },
      { text: "Team features", included: false },
      { text: "Custom labs", included: false },
    ],
    cta: "Upgrade to Premium",
    variant: "cyber" as const,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/user/month",
    icon: Building2,
    description: "For teams and organizations",
    features: [
      { text: "Everything in Premium", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Custom lab environments", included: true },
      { text: "SSO & SCIM", included: true },
      { text: "Admin dashboard", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    highlighted: false,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">Unlock your full potential with premium access</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={plan.highlighted ? "border-cyber-purple shadow-lg shadow-cyber-purple/10 relative" : ""}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="purple">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyber-purple/10">
                    <Icon className="h-6 w-6 text-cyber-purple" />
                  </div>
                </div>
                <CardTitle className="mt-4">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-cyber-green" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={feature.included ? "text-sm" : "text-sm text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.variant} className="w-full">
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
