'use client'
import { UploadDropzone } from "@/app/utils/UploadThingComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ArticleCreateSite({params} : {params : {siteId : string}}){
    const [imageUrl, setimageUrl] = useState<undefined | string>(undefined)
    return (
        <>
        <div className="flex items-center">
            <Button size="icon" variant="outline" className="mr-3" asChild>
                <Link href={`/dashboard/sites/${params.siteId}`}>
                <ArrowLeft className="size-4" />
                </Link>
            </Button>
          <h2 className="text-xl font-semibold">Create Article</h2>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Article Details</CardTitle>
                <CardDescription>
                    Please fill in all the details regarding the article!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6">
                <div className="grid gap-2">
                 <Label>Title</Label>
                 <Input placeholder="Blogging application"/>
                </div>
                <div className="grid gap-2">
                 <Label>Slug</Label>
                 <Input placeholder="Article Slug"/>
                 <Button className="w-fit pt-2" variant="secondary" type="button">
                    <Atom className="mr-2 size-4"/> Generate slug
                 </Button>
                </div>
                <div className="grid gap-2">
                <Label>Small Description</Label>
                <Textarea className="h-32" placeholder="small description for your blog article..."/>
                </div>
                <div className="grid gap-2">
                <Label>Cover Image</Label>
                 {imageUrl ? (
                    <Image
                    src={imageUrl}
                    alt="Uploaded image"
                    className="object-cover w-[200px] h-[200px] rounded-lg" 
                    width={200}
                    height={200}
                    />
                 ) : (
                    <UploadDropzone onClientUploadComplete={(res) => {
                        setimageUrl(res[0].url)
                        toast.success('Image has been uploaded')
                    }} endpoint="imageUploader"
                    onUploadError={() => {
                        toast.error('Something went wrong..')
                    }}
                    />
                 )}
                </div>
                </form>
            </CardContent>
        </Card>
        </>
    )
}