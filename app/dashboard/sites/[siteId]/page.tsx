import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, FileIcon, PlusCircleIcon, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId : string, siteId : string){
  const data = await prisma.post.findMany({
    where : {
        userId : userId,
        siteId : siteId
    }, 
    select : {
        image : true, 
        title : true,
        createdAt : true,
        id : true
    }, 
    orderBy : {
        createdAt : 'desc'
    }
  })

  return data 
}

export default async function SiteIdRoute({params} : {params : {siteId : string}}){
    const {getUser} =  getKindeServerSession();
    const user = await getUser()

    if(!user){
        return redirect('/api/auth/login')
    }

    const data = await getData(user.id, params.siteId)
    return (
        <>
        <div className="flex w-full justify-end gap-4">
        <Button asChild variant="secondary">
            <Link href="#">
            <Book className="size-4 mr-2"/>
            View Blogs</Link>
        </Button>
        <Button asChild variant="secondary">
            <Link href="#">
            <Settings className="size-4 mr-2"/>
            Settings</Link>
        </Button>
        <Button asChild>
            <Link href="#">
            <PlusCircleIcon className="size-4 mr-2"/>
            Create Article
            </Link>
        </Button>
        </div>
        {data === undefined || data.length === 0 ? (
           <div className="flex flex-col justify-center items-center rounded-md border border-dashed p-8 text-center 
           animate-in fade-in-50">
              <div className="flex size-20 items-center justify-center rounded-xl bg-primary/20">
              <FileIcon className="size-10 text-primary"/>
              </div>
              <h2 className="mt-6 text-xl font-semibold">You dont have any sites yet. Please create one!</h2>
              <p className="mb-4 mt-2 text-center text-sm leading-text-muted-foreground max-w-sm mx-auto">
                Get started! create and craft your site now
              </p>
              <Button asChild>
           <Link href={"/dashboard/sites/new"}>
           <PlusCircleIcon className="mr-2 size-4"/>
           Create Site
           </Link>
           </Button>
          </div>
        ) : (
          <h1> here is data </h1>
        )}
        </>
    )
}