'use client'
import { CreatePostAction } from "@/app/action";
import TailwindEditor from "@/app/components/EditorWrapper";
import { UploadDropzone } from "@/app/utils/UploadThingComponents";
import { PostSchema } from "@/app/utils/zodSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import slugify from 'react-slugify'
import { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { SubmitButton } from "@/app/components/SubmitButton";

export default function ArticleCreateSite({params} : {params : {siteId : string}}){
    const [imageUrl, setimageUrl] = useState<undefined | string>(undefined)
    const [value, setValue] = useState<undefined | JSONContent>(undefined)
    const [title, setTitle] = useState<undefined | string>(undefined)
    const [slug, setSlug] = useState<undefined | string>(undefined)
    // useFormState is used here to fetch data from our server action
    const [lastResult,action] = useFormState(CreatePostAction, undefined )
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
                <form id={form.id} onSubmit={form.onSubmit} action={action}  className="flex flex-col gap-6">
                <input type="hidden" name="siteId" value={params.siteId}/>
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
                defaultValue={fields.smallDescription.initialValue}
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
              // value={value}
                />
                <TailwindEditor onChange={setValue} initialValue={value} />
                <p className="text-500 text-sm">{fields.articleContent.errors}</p>
                </div>
               <SubmitButton text="Create Article"/>
                </form>
            </CardContent>
        </Card>
        </>
    )
}