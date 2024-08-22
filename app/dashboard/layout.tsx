import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/book.svg"
import DahsboardItems from "../components/DashboardItems";
import { CircleUser, DollarSign, Globe, Home } from "lucide-react";
import { ThemToggle } from "../components/ThemeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export const navLinks = [
    {
        name : 'Dashboard',
        href : '/dashboard',
        icon : Home
    },
    {
        name : 'Sites',
        href : '/dashboard/sites',
        icon : Globe
    },
    {
        name : 'Pricing',
        href : '/dashboard/pricing',
        icon : DollarSign
    },
]

export default function DashboardLayout({children} : {children : ReactNode}){
    return (
        <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-black-100/40 md:block">
        <div className="h-full flex flex-col gap-2 max-h-screen">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
           <Link href={'/'} className="flex items-center gap-2 font-semibold ">
           <Image src={Logo} alt="Logo" className="size-6 dark:bg-gray-500 rounded-sm"/>
            <h3 className="text-2xl">Memo<span className="text-primary">ir</span></h3>
           </Link>
        </div>

        <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4">
                <DahsboardItems/>
            </nav>
        </div>
        </div>
        </div>

        <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-black-100/40 px-4 lg:h-[60px] lg:px-6">
         <div className="ml-auto flex items-center gap-x-5">
            <ThemToggle/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-xl dark:hover:bg-slate-800">
                    <CircleUser className="h-6 w-7"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild> 
                    <LogoutLink> Logout </LogoutLink>
                     </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
         </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6 lg:gap-6">
            {children}
        </main>
        </div>
        </section>
    )

}