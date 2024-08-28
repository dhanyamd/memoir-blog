import { DeletPostAction } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card,CardDescription,CardFooter,CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteForm({params} : {params : {siteId : string, articleId : string}}){
    return (
        <div className="flex flex-1 items-center mb-40 mr-20 justify-center">
        <Card className="max-w-xl">
            <CardHeader>
               <CardTitle>Are you absolutely sure?</CardTitle>
               <CardDescription>This action will delete your article permanently and cannot be recovered</CardDescription>
            </CardHeader>
            <CardFooter className="w-full flex justify-between">
                <Button variant="secondary" asChild>
                <Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
                </Button>
                <form action={DeletPostAction}>
                    <input type="hidden" name="articleId" value={params.articleId}/>
                    <input type="hidden" name="siteId" value={params.siteId}/>
                    <SubmitButton variant="destructive" text="Delete Article"/>
                </form>
            </CardFooter>
        </Card>
        </div>
    )
}