"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { siteSchema } from "./utils/zodSchema";
import {parseWithZod} from "@conform-to/zod"
import prisma from "./utils/db";
import { NextResponse } from "next/server";


export async function CreateSiteAction(prevState : any, formData : FormData){
    const {getUser} =  getKindeServerSession();

    const user = await getUser()
    if(!user){
      return redirect('/api/auth/login')
    }

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


