import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function CancelledRoute(){
    return (
        <div className="w-full flex flex-1 justify-center items-center">
          <Card className="w-[350px]" >
            <div className="p-6">
              <div className="w-full flex justify-center">
                <XIcon className="size-12 p-2 rounded-full bg-red-500/30 text-red-500"/>
              </div>
              <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight">No worries! You wont be charged again</p>

            <Button className="mt-5 w-full">
              <Link href='/dashboard'>Go back to Dashboard</Link>
            </Button>
              </div>
            </div>
          </Card>
        </div>
    )
}