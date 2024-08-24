import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSiteRoute(){
    return(
        <div className="flex flex-col flex-1 items-center justify-items-start">
        <Card className="max-w-[450px]">
            <CardHeader>
                <CardTitle>Create Site</CardTitle>
                <CardDescription>Create your site here! Click this button once you're done</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-y-6">
                  <div className="grid gap-2">
                   <Label className="px-2">Site name</Label>
                <Input placeholder="site name"/>
                  </div>
                  <div className="grid gap-2">
                    <Label className="px-2">Sub domain</Label>
                   <Input  placeholder="sub domain"/>
                  </div>
                  <div className="grid gap-2">
                    <Label className="px-2">Description</Label>
                    <Textarea placeholder="small description for your site..." />
                  </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="flex items-center w-full"> Submit </Button>
            </CardFooter>
        </Card>
        </div>
    )
}