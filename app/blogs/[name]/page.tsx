import prisma from "@/app/utils/db"
import Image from "next/image"
import { notFound } from "next/navigation"
import book from "@/public/book.svg"
import { ThemToggle } from "@/app/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import noImage from "@/public/faceless.png"


async function getData(subDir : string) {
     const data = await prisma.site.findFirst({
        where : {
            subdirectory : subDir,
        },
        select : {
            name : true,
            posts : {
               select : {
                smallDescription : true,
                title : true,
                image : true,
                createdAt : true,
                slug : true,
                id : true
               },
               orderBy : {
                createdAt : "desc"
               }               
            }
        }
    })
    if(!data){
        return notFound()
    }
    return data
}

export default async function BlogIndexPage({params} : {params : {name : string}}){
    const data = await getData(params.name)
     
    return (
        <>
          <nav className="grid grid-cols-3 my-10">
            <div className="col-span-1" />
            <div className="flex items-center gap-x-4 justify-center">
              <Image src={book}  className="size-7 dark:bg-gray-500 rounded-sm" alt="Book" width={40} height={40} />
              <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
            </div>
    
            <div className="col-span-1 flex w-full place-items-end justify-end">
              <ThemToggle />
            </div>
          </nav>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
       {data.posts.map((item) => (
        <Card key={item.id}>
         <Image src={item.image ?? noImage} alt="no-image"
         className="rounded-t-lg object-cover w-full h-[170px]"
         width={400}
         height={200}
         />
         <CardHeader>
          <CardTitle className="p-1 truncate">{item.title}</CardTitle>
         <CardDescription className=" px-1 line-clamp-2">{item.smallDescription}</CardDescription>
         </CardHeader>
         <CardFooter>
          <Button asChild className=" w-full ">
            <Link href={`/blogs/${params.name}/${item.slug}`}>Read More</Link>
          </Button>
         </CardFooter>
        </Card>
       ))}
      </div>

          </>

    )
   
}