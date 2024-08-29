"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { UploadDropzone } from "../utils/UploadThingComponents"
import Image from "next/image"
import { SubmitButton } from "./SubmitButton"
import { toast } from "sonner"
import { updateImage } from "../action"

interface iAppProps{
    siteId : string
}

export function UplaodImageForm({siteId} : iAppProps){
    const [imageUrl , setimageUrl] = useState<undefined | string>(undefined)
    return (
        <Card>
            <CardHeader>
              <CardTitle>Image</CardTitle>
              <CardDescription>This is the image of your site. Change it here</CardDescription>
            </CardHeader>
            <CardContent>
                {imageUrl ? (
                    <Image src={imageUrl} alt="imageUrl" width={200} height={200} className="object-cover rounded-lg size-[200px]" />
                ) : (
                    <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => {
                        setimageUrl(res[0].url)
                        toast.success('Image uploaded successfully!')
                    }}
                    onUploadError={() => {
                       toast.error("Something went wrong while uploading!")
                    }}
                    />
                )}
            </CardContent>
            <CardFooter>
                <form action={updateImage}>
                    <input type="hidden" name="siteId" value={siteId}/>
                    <input type="hidden" name="imageUrl" value={imageUrl}/>
                <SubmitButton text="Change image"/>
                </form>
            </CardFooter>
        </Card>
    )
}