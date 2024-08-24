import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileIcon, PlusCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import noImage from "@/public/faceless.png"

async function getData(userId : string){
  const data = await prisma.site.findMany({
    where : {
      userId : userId
    },
    orderBy : {
      createdAt : 'desc'
    }
  })
  console.log(data)
  return data
}

export default async function SiteRoute(){
  const {getUser} = getKindeServerSession();
  const user = await getUser()
  //just to test and check what's in the user and where is it coming from
  console.log(user)

  if(!user){
    return redirect('/api/auth/login')
  }

  const data = await getData(user.id)
  return (
    <>
    <div className="flex justify-end w-full">
    <Button asChild>
     <Link href={"/dashboard/sites/new"}>
     <PlusCircleIcon className="mr-2 size-4"/>
     Create Site
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
       {data.map((item) => (
        <Card key={item.id}>
         <Image src={item.imageUrl ?? noImage} alt="no-image"
         className="rounded-t-lg object-cover w-full h-[170px]"
         width={400}
         height={200}
         />
         <CardHeader>
          <CardTitle className="px-1">{item.name}</CardTitle>
         <CardDescription className="px-1">{item.description}</CardDescription>
         </CardHeader>
         <CardFooter>
          <Button asChild className="flex justify-center items-center w-full ">
            <Link href={`/dashboard/sites/${item.id}`}>View Articles</Link>
          </Button>
         </CardFooter>
        </Card>
       ))}
      </div>
    )}
    </>
  )
}