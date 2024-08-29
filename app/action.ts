"use server"
import { redirect } from "next/navigation";
import { PostSchema, siteSchema } from "./utils/zodSchema";
import {parseWithZod} from "@conform-to/zod"
import prisma from "./utils/db";
import { getUser } from "./utils/getUser";


export async function CreateSiteAction(prevState : any, formData : FormData){
     const user = await getUser()

    const submission = parseWithZod(formData, {
        schema : siteSchema
    })

    if(submission.status !== "success"){
        return submission.reply()
    }
  
  const response = await prisma.site.create({
      data : {
        description : submission.value.description,
        name : submission.value.name,
        subdirectory : submission.value.subdomain,
        userId : user.id
      }
    })

    return redirect('/dashboard/sites')
}

export async function CreatePostAction(prevState : any,formData : FormData){
  const user = await getUser();
  
  const submission = parseWithZod(formData, {
    schema : PostSchema
  })

  console.log(submission)

  if(submission.status !== "success"){
    return submission.reply()
  }

  const data = await prisma.post.create({
    data : {
      title : submission.value.title,
      smallDescription : submission.value.smallDescription,
      slug : submission.value.slug,
      articleContent : JSON.parse(submission.value.articleContent),
      image : submission.value.coverImage,
      userId : user.id,
      siteId : formData.get("siteId") as string,
      }
  })
  return redirect(`/dashboard/sites/${formData.get("siteId")}`)
}

export async function EditPostAction(prevState : any, formData : FormData){
  const user = await getUser();
  
  const submission = parseWithZod(formData, {
    schema : PostSchema
  })

  if(submission.status !== "success"){
    return submission.reply()
  }

  const data = await prisma.post.update({
    where : {
      userId : user.id,
      id : formData.get("articleId") as string
    }, 
    data : {
      title : submission.value.title,
      smallDescription : submission.value.smallDescription,
      slug : submission.value.slug,
      articleContent : JSON.parse(submission.value.articleContent),
      image : submission.value.coverImage
    }
  })
  return redirect(`/dashboard/sites/${formData.get("siteId")}`)
}

export async function DeletPostAction(formData : FormData){
  const user = await getUser();

  const data = await prisma.post.delete({
    where : {
      userId : user.id,
      id : formData.get("articleId") as string
    }
  })
  return redirect(`/dashboard/sites/${formData.get("siteId")}`)
}

export async function updateImage(formData : FormData){
  const user = await getUser();

  const data = await prisma.site.update({
    where : {
      userId : user.id,
      id : formData.get("siteId") as string
    },
    data : {
      imageUrl : formData.get("imageUrl") as string
    }
  })

  return redirect(`/dashboard/sites/${formData.get("siteId")}`)
}
