import {z} from "zod"

export const siteSchema = z.object({
    name : z.string().min(1).max(35),
    description : z.string().min(1).max(150),
    subdomain : z.string().min(1).max(40)
})

export const PostSchema = z.object({
    title : z.string().min(1).max(100),
    slug : z.string().min(1).max(150),
    coverImage : z.string().min(1),
    smallDescription : z.string().min(1).max(200),
    articleContent : z.string().min(1)
})