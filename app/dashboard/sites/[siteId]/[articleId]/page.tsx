import { EditArticleForm } from "@/app/components/forms/Edit ArticleForm";
import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(postId : string){
    const data = await prisma.post.findUnique({
        where: {
            id : postId
        },
        select : {
           image : true,
           title : true,
           smallDescription : true,
           slug : true,
           articleContent : true,
           id : true       
        }
    })

    if(!data){
        return notFound()
    }

    return data;
}

export default async function EditRoute({params} : {params : {articleId : string, siteId : string}}){
    const data = await getData(params.articleId);
    return (
        <div>
            <div className="flex items-center">
                <Button className="mr-3" asChild size="icon" variant="outline">
                    <Link href={`/dashboard/sites/${params.siteId}`}>
                    <ArrowLeft className="size-4"/>
                    </Link>
                </Button>
                <h1 className="font-semibold text-2xl">Edit Article</h1>
            </div>
            <EditArticleForm siteId={params.siteId} data={data} />
        </div>
    )
}