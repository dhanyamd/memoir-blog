'use client'
import React from 'react'
import { navLinks } from '../dashboard/layout'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const DashboardItems = () => {
    const pathname = usePathname()
    return (
        <>
        {navLinks.map((item) => (
            <Link href={item.href} key={item.name} className={cn(
                pathname == item.href ? "bg-muted text-primary" : "text-muted-foreground bg-none", 
                "flex items-center gap-5 rounded-lg px-3 py-2 transition-all hover:text-primary/80"
            )}>
                <item.icon className='size-5'/>
               {item.name}
            </Link>
        ))}
        </>
    )
}

export default DashboardItems
