"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Atom } from "lucide-react"
import { toast } from "sonner"
import TailwindEditor from "../EditorWrapper"
import Image from "next/image"
import { SubmitButton } from "../SubmitButton"
import { UploadDropzone } from "@/app/utils/UploadThingComponents"
import { useState } from "react"
import { JSONContent } from "novel"
import { useFormState } from "react-dom"
import { parseWithZod } from "@conform-to/zod"
import { useForm } from "@conform-to/react"
import { PostSchema } from "@/app/utils/zodSchema"
import { CreatePostAction, EditPostAction } from "@/app/action"
import { Input } from "@/components/ui/input"
import slugify from "react-slugify"

interface iAppProps{
   data : {
    image: string;
    title: string;
    id: string;
    articleContent: any;
    smallDescription: string;
    slug: string;
   },
  siteId : string
}

export function EditArticleForm({data, siteId} : iAppProps){
    const [imageUrl, setimageUrl] = useState<undefined | string>(data.image)
    const [value, setValue] = useState<undefined | JSONContent>(data.articleContent)
    const [title, setTitle] = useState<undefined | string>(data.title)
    const [slug, setSlug] = useState<undefined | string>(data.slug)
    const [lastResult,action] = useFormState(EditPostAction, undefined )
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {schema : PostSchema})
        },
        shouldValidate : 'onBlur',
        shouldRevalidate : 'onInput'
    })

    function handleSlugGenerator(){
        const titleInput = title;
  
        if(titleInput?.length === 0 || titleInput === undefined){
          return toast.error('Please create a title first')
        }
  
        setSlug(slugify(titleInput))
        return toast.success('Slug has been created')
      }
    return (
        <Card className="mt-5">
        <CardHeader>
            <CardTitle>Article Details</CardTitle>
            <CardDescription>
                Please fill in all the details regarding the article!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form id={form.id} onSubmit={form.onSubmit} action={action}  className="flex flex-col gap-6">
            <input type="hidden" name="articleId" value={data.id}/>
            <input type="hidden" name="siteId" value={siteId} />
            <div className="grid gap-2">
             <Label>Title</Label>
             <Input key={fields.title.key} 
             name={fields.title.name}
             defaultValue={fields.title.initialValue}
             placeholder="Blogging application"
             onChange={(e) => setTitle(e.target.value)}
             value={title}
             />
             <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>
            <div className="grid gap-2">
             <Label>Slug</Label>
             <Input
             key={fields.slug.key}
             name={fields.slug.name}
             defaultValue={fields.slug.initialValue}
             placeholder="Article Slug"
             onChange={(e) => setSlug(e.target.value)}
             value={slug}
             />
             <Button onClick={handleSlugGenerator} className="w-fit pt-2" variant="secondary" type="button">
                <Atom className="mr-2 size-4"/> Generate slug
             </Button>
             <p>{fields.slug.errors}</p>
            </div>
            <div className="grid gap-2">
            <Label>Small Description</Label>
            <Textarea
            key={fields.smallDescription.key}
            name={fields.smallDescription.name}
            defaultValue={data.smallDescription}
            className="h-32" placeholder="small description for your blog article..."/>
            <p className="text-red-500 text-sm">{fields.smallDescription.errors}</p>
            </div>
            <div className="grid gap-2">
            <Label>Cover Image</Label>
            <input 
            type="hidden"
            name={fields.coverImage.name}
            key={fields.coverImage.key}
            defaultValue={fields.coverImage.initialValue}
            value={imageUrl}
            />
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
             <p className="text-500 text-sm">{fields.coverImage.errors}</p>
            </div>

            <div className="grid gap-2">
            <Label>Article Content</Label>
            <input 
            type="hidden"
            name={fields.articleContent.name}
            key={fields.articleContent.key}
            defaultValue={fields.articleContent.initialValue}
            value={JSON.stringify(value)}
            />
            <TailwindEditor onChange={setValue} initialValue={value} />
            <p className="text-500 text-sm">{fields.articleContent.errors}</p>
            </div>
           <SubmitButton text="Edit Article"/>
            </form>
        </CardContent>
    </Card>
    )
}