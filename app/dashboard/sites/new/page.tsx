"use client"
import { CreateSiteAction } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitButton";
import { siteCreationSchema, siteSchema } from "@/app/utils/zodSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

export default function NewSiteRoute(){
  const [lastResult, action] = useFormState(CreateSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult ,
    onValidate({formData}){
      return parseWithZod(formData, {
        schema : siteSchema
      })
    },
    shouldValidate : 'onBlur',
    shouldRevalidate : 'onInput'

  })
    return(
        <div className="flex flex-col flex-1 items-center justify-items-start">
        <Card className="max-w-[450px]">
           <form id={form.id} onSubmit={form.onSubmit} action={action}>
           <CardHeader>
                <CardTitle>Create Site</CardTitle>
                <CardDescription>Create your site here! Click this button once you're done</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-y-6">
                  <div className="grid gap-2">
                   <Label className="px-2">Site name</Label>
                <Input  
                name={fields.name.name}
                key={fields.name.key}
                defaultValue={fields.name.initialValue}
                placeholder="site name"/>
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label className="px-2">Subdomain</Label>
                   <Input 
                   name={fields.subdomain.name}
                   key={fields.subdomain.key}
                   defaultValue={fields.subdomain.initialValue}
                    placeholder="Subdomain"/>
                    <p className="text-red-500 text-sm">{fields.subdomain.errors}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label className="px-2">Description</Label>
                    <Textarea 
                    name={fields.description.name}
                    key={fields.description.key}
                    defaultValue={fields.description.initialValue}
                    placeholder="small description for your site..." />
                  <p className="text-red-500 text-sm">{fields.description.errors}</p>
                  </div>
                </div>
            </CardContent>
            <CardFooter>
              <SubmitButton text="Create Site"/>
            </CardFooter>
           </form>
        </Card>
        </div>
    )
}