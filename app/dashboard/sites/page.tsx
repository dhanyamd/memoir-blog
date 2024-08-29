import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileIcon, PlusCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import noImage from "@/public/faceless.png"
import { EmptyState } from "@/app/components/EmptyState";

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
      <EmptyState
       title="You dont have any sites yet. Please create one!"
       description="Get started! create and craft your site now"
       buttonText="Create Site"
       href="/dashboard/sites/new"
       />
    ) : (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
       {data.map((item) => (
        <Card key={item.id}>
         <Image src={item.imageUrl ?? noImage} alt="no-image"
         className="rounded-t-lg object-cover w-full h-[170px]"
         width={400}
         height={200}
         />
         <CardHeader>
          <CardTitle className="px-1 truncate">{item.name}</CardTitle>
         <CardDescription className="px-1 line-clamp-3">{item.description}</CardDescription>
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