import Image from "next/image"
import KindeLogo from "@/public/kinde.svg"
import Nextjs from "@/public/nextjs.svg"
import Novel from "@/public/no.png"
export function Logos(){
    return (
        <div className="py-10">
       <h2 className="text-center text-lg font-semibold leading-7 ">
         Made with the best technologies in the world
       </h2>
       <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 
       sm:max-w-xl sm:grid-cols-6 lg:mx-0 lg:max-w-none lg:grid-cols-5 ">
        <Image
          src={KindeLogo}
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={Nextjs}
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={KindeLogo}
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={Nextjs}
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={Novel}
          alt="Logo"
          className="col-span-2 max-h-20 w-full object-contain lg:col-span-1 dark:invert"
        />
       </div>
        </div>
    )
}