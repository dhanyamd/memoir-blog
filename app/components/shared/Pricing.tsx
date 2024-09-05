import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface iAppProps{
    id : number;
    cardTitle : string;
    cardDescription : string;
    priceTitle : string;
    benefits : string[]
}

export const PricingPlans : iAppProps[] = [{
    id : 0,
    cardTitle : "Freelancer",
    cardDescription : "The best pricing plan for people starting out",
    benefits : [
        "10 Sites",
        "Up to 1000 visitors",
        "Up to 1000 visitors",
        "Up to 1000 visitors"
    ],
    priceTitle : "Free"
},{
    id : 1,
    cardTitle : "Startup",
    cardDescription : "The best pricing plan for proffesionals",
    benefits : [
        "Unlimited Site",
        "Unlimited visitors",
        "Unlimited visitors",
        "Unlimited visitors"
    ],
    priceTitle : "$29"
}]

export default function PricingTable() {
    return (
        <>

            <div className="max-w-4xl mx-auto text-center">
                <p className="font-semibold text-primary">Pricing</p>
                <h1 className="mt-2 text-4xl sm:text-5xl font-bold -tracking-wide">Pricing plans for everyone and every budget !</h1>

            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
                Choose your pricing plan and get ready to start enjoy writing your blogs with our plan :)
            </p>
         
           <div className="grid grid-cols-1 gap-8 mt-5 lg:grid-cols-2">
             {PricingPlans.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.cardTitle}</CardTitle>
                    <CardDescription>{item.cardDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                        <p className="mt-6 text-4xl font-bold tracking-tight">{item.priceTitle}</p>
                        <ul className="text-muted-foreground mt-8 space-y-3 text-sm leading-6 ">
                           {item.benefits.map((benefit, index) => (
                            <li key={index} className="flex gap-x-3">
                                <Check className="text-primary size-5"/>
                                  {benefit}
                            </li>
                           ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button>Choose Plan</Button>
                    </CardFooter>
                </Card>
             ))}
           </div>
        </>
    )
}