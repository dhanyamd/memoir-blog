import PricingTable from "@/app/components/shared/Pricing";
import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/utils/db";
import { getUser } from "@/app/utils/getUser";
import { stripe } from "@/app/utils/stripe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

async function getData(userId: string) {
    const data = await prisma.subscription.findUnique({
        where: {
            userId: userId
        },
        select: {
            status: true,
            user: {
                select: {
                    customerId: true
                }
            }
        }
    })
    return data
}

export default async function PricingPage() {
    const user = await getUser();
    const data = await getData(user.id)
  
async function createCustomerPortal(){
    "use server"
    const session = await stripe.billingPortal.sessions.create({
        customer : data?.user?.customerId as string,
        return_url : "http://localhost:3000/dashboard"
    })
    return redirect(session.url)
}
    if(data?.status === 'active'){
        return (
            <Card className="w-full">
             <CardHeader>
                <CardTitle>Edit subscription</CardTitle>
                <CardDescription>
                    Click on the button below this will give the oppurtunity to change your payment settings and view your statement at the same time.
                </CardDescription>
             </CardHeader>
             <CardContent>
                <form action={createCustomerPortal}>
                    <SubmitButton text="View subscription details"/>
                </form>
             </CardContent>
            </Card>
        )
    }
    return (
        <div>
            <PricingTable />
        </div>
    )
}