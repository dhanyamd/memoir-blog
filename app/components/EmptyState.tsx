import { Button } from "@/components/ui/button";
import { FileIcon, Link, PlusCircleIcon } from "lucide-react";

interface iAppProps{
    title : string;
    description : string;
    buttonText : string;
    href : string
}

export function EmptyState({title, description, buttonText, href} : iAppProps){
    return (
        <div className="flex flex-col justify-center items-center rounded-md border border-dashed p-8 text-center 
        animate-in fade-in-50">
           <div className="flex size-20 items-center justify-center rounded-xl bg-primary/20">
           <FileIcon className="size-10 text-primary"/>
           </div>
           <h2 className="mt-6 text-xl font-semibold">{title}</h2>
           <p className="mb-4 mt-2 text-center text-sm leading-text-muted-foreground max-w-sm mx-auto">
            {description}
           </p>
           <Button asChild>
        <Link href={href}>
        <PlusCircleIcon className="mr-2 size-4"/>
         {buttonText}
        </Link>
        </Button>
       </div>
    )
}