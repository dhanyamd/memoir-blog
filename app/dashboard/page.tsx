'use server'
import React from 'react'
import prisma from '../utils/db'
import { getUser } from '../utils/getUser'
import { EmptyState } from '../components/EmptyState'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import noImage from "@/public/faceless.png"
import Link from 'next/link'

async function getData(userId : string){
  //runs the query of both sites and posts parallelly and conccurently
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where : {
        userId : userId
      }, 
      orderBy : {
        createdAt : 'desc'
      }, 
      take : 3
    }),

      prisma.post.findMany({
      where : {
        userId : userId
      },
      orderBy : {
        createdAt : "desc"
      },
      take : 3
     })
  ])
  return {sites, articles}
}

export default async function DashboardPage() {
  const user = await getUser();
  const {articles, sites} = await getData(user?.id)
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-5'>Your Sites</h1>
       {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {sites.map((item) => (
         <Card key={item.id}>
          <Image src={item.imageUrl ?? noImage } alt="no-image"
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
       ) : (
        <EmptyState 
        title="You dont have any sites created yet"
        description="You currently dont have any sites! Please create one so that you could see them right here!"
        href='/dashboard/sites/new'
        buttonText='Create Site'
        />
       )}

       <h1 className='text-2xl mb-5 font-semibold mt-10'>Recent Articles</h1>
       {articles.length > 0 ? (
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
         {articles.map((item) => (
          <Card key={item.id}>
           <Image src={item.image ?? noImage } alt="no-image"
           className="rounded-t-lg object-cover w-full h-[170px]"
           width={400}
           height={200}
           />
           <CardHeader>
            <CardTitle className="px-1 truncate">{item.title}</CardTitle>
           <CardDescription className="px-1 line-clamp-3">{item.smallDescription}</CardDescription>
           </CardHeader>
           <CardFooter>
            <Button asChild className="flex justify-center items-center w-full ">
              <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>Edit Article</Link>
            </Button>
           </CardFooter>
          </Card>
         ))}
        </div>
       ): (
        <EmptyState 
        title="You dont have any articles created yet"
        description="You currently dont have any articles! Please create one so that you could see them right here!"
        href='/dashboard/sites'
        buttonText='Create Article'
        />
       )}
    </div>
  )
}

