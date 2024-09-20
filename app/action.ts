"use server"
import { redirect } from "next/navigation";
import { PostSchema, siteCreationSchema, siteSchema } from "./utils/zodSchema";
import {parseWithZod} from "@conform-to/zod"
import prisma from "./utils/db";
import { getUser } from "./utils/getUser";
import { stripe } from "./utils/stripe";


export async function CreateSiteAction(prevState : any, formData : FormData){
     const user = await getUser()

    const submission = await parseWithZod(formData, {
        schema : siteCreationSchema({
          async isSubDirectoryUnique(){
            const existingSubDomain = prisma.site.findUnique({
              //@ts-ignore
              where : {
                subdirectory : formData.get("subdirectory") as string,
              }
            })
            return !existingSubDomain
          }
        }),
        async : true
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

export async function DeleteSite(formData : FormData){
  const user = await getUser();

  const data = await prisma.site.delete({
    where : {
      userId : user.id,
      id : formData.get("siteId") as string
    }
  })
  return redirect(`/dashboard/sites`)
}

export async function CreateSubscription(){
  const user = await getUser();
  let stripeUserId = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      customerId: true,
      email: true,
      firstName: true,
    },
  });

  if (!stripeUserId?.customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUserId?.email,
      name: stripeUserId?.firstName,
    });

    stripeUserId = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        customerId: stripeCustomer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeUserId.customerId as string,
    mode: "subscription",
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url:
      process.env.NODE_ENV === "production"
        ? "https://memoir.vercel.app/dashboard/payment/success"
        : "http://localhost:3000/dashboard/payment/success",
    cancel_url:
      process.env.NODE_ENV === "production"
        ? "https://memoir.vercel.app/dashboard/payment/cancelled"
        : "http://localhost:3000/dashboard/payment/cancelled",
  })
  return redirect(session.url as string);

}