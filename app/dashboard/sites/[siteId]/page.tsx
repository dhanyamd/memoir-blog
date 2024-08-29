import { EmptyState } from "@/app/components/EmptyState";
import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, FileIcon, MoreHorizontal, PlusCircleIcon, Settings } from "lucide-react";
import Image from "next/image";
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
            <Link href={`/dashboard/sites/${params.siteId}/settings`}>
            <Settings className="size-4 mr-2"/>
            Settings</Link>
        </Button>
        <Button asChild>
            <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircleIcon className="size-4 mr-2"/>
            Create Article
            </Link>
        </Button>
        </div>
        {data === undefined || data.length === 0 ? (
           <EmptyState 
           title="You dont have any articles created!"
           description="You currently dont have any articles! please create one so that you could see right here"
           buttonText="Create Article"
           href={`/dashboard/sites/${params.siteId}/create`}
           />
        ) : (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Articles</CardTitle>
                <CardDescription>Manage your articles with an interactive interface</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                  <TableRow className="border">
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.id}>
                       <TableCell>
                        <Image src={item.image}
                        alt="image"
                        width={64}
                        height={64}
                        className="size-16 rounded-md object-cover"
                        />
                       </TableCell>
                       <TableCell className="font-medium">
                        {item.title}
                       </TableCell>
                       <TableCell>
                        <Badge className="bg-green-500/10 text-green-500" variant="outline">Published</Badge>
                       </TableCell>
                       <TableCell>
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium"
                        }).format(item.createdAt)
                        }
                       </TableCell>
                       <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="size-4"/>
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center">
                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
                           <DropdownMenuSeparator></DropdownMenuSeparator>
                           <DropdownMenuItem asChild>
                            <Link href={`/dashboard/sites/${params.siteId}/${item.id}`}>Edit</Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem>
                            <Link href={`/dashboard/sites/${params.siteId}/${item.id}/delete`}>Delete</Link>
                           </DropdownMenuItem>
                          </DropdownMenuContent >
                        </DropdownMenu>
                       </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
        </>
    )
}