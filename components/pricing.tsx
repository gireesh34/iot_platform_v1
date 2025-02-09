import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const tiers = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small businesses and startups",
    features: ["Up to 10 devices", "Basic analytics", "Email support", "99.9% uptime guarantee"],
  },
  {
    name: "Pro",
    price: "$99",
    description: "Ideal for growing businesses",
    features: [
      "Up to 50 devices",
      "Advanced analytics",
      "Priority support",
      "99.99% uptime guarantee",
      "Custom integrations",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale IoT deployments",
    features: [
      "Unlimited devices",
      "Real-time analytics",
      "Dedicated account manager",
      "99.999% uptime guarantee",
      "Custom development",
      "On-premise deployment option",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing Plans</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Choose the perfect plan for your IoT needs
          </p>
        </div>
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-4xl font-bold">{tier.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                <ul className="mt-6 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

