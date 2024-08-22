import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function SiteRoute(){
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
    </>
  )
}