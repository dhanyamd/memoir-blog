import { DeleteSite } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitButton";
import { UplaodImageForm } from "@/app/components/UploadImageForm";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SiteSettings({params} : {params : {siteId : string}}){
    return (
        <>
        <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon">
            <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="size-4"/>
            </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
        </div>

        <UplaodImageForm siteId={params.siteId} />

        <Card className="border-red-500 bg-red-500/10">
            <CardHeader>
                <CardTitle className="text-red-500">Danger</CardTitle>
                <CardDescription>
                    This will delete your site and all the actions associated with it 
                    <br/>
                  Click the button below to delete everything! 
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <form action={DeleteSite}>
                <input type="hidden" name="siteId" value={params.siteId} />
                <SubmitButton variant="destructive" text="Delete Everything"></SubmitButton>
                </form>
            </CardFooter>
        </Card>
        </>
    )
}