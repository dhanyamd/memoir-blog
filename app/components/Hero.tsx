import Image from "next/image";
import Link from "next/link";
import book from "@/public/book.svg"
import { ThemToggle } from "./ThemeToggle";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import HeroImage from "@/public/article.png"
export function Hero(){
    return (
        <>
        <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
       <Link href="/" className="flex items-center gap-2">
       <Image src={book} className="size-7 dark:bg-gray-500 rounded-sm" alt="Logo"/>
       <h4 className="text-3xl font-semibold">Memo<span className="text-primary">ir</span></h4>
       </Link>
       <div className="md:hidden">
        <ThemToggle />
       </div>
        </div>
       <nav className="hidden md:flex md:justify-end md:space-x-4">
        <ThemToggle/>
        <LoginLink>
            <Button variant="secondary">Sign in</Button>
        </LoginLink>
        <RegisterLink>
            <Button>Sign up</Button>
        </RegisterLink>
       </nav>
        </div>

        <section className="relative flex items-center justify-center">
            <div className="relative items-center w-full py-12 lg:py-20 ">
                <div className="text-center">
                 <span className="text-small text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">Your Ultimate Blogging Site</span>
                 <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
                    Publish your Blog{""}<span className="block text-primary">in Minutes!</span>
                 </h1>

                 <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tight">
                    Creating and publishing blogs might be a difficult task.
                     Setting up your blog here takes a few minutes
                 </p>
                 <div className="flex items-center gap-x-5 w-full justify-center mt-5">
                 <LoginLink>
                    <Button variant="secondary">Sign in</Button>
                 </LoginLink>
                 <RegisterLink>
                    <Button>Try for free!</Button>
                 </RegisterLink>
                 </div>
                </div>

                <div className="relative items-center w-full py-12 mx-auto mt-12">
               <svg 
                    className="absolute -mt-24 blur-3xl bg-gradient from-violet-500 to-purple-500"
                    fill="none"
                    viewBox="0 0 400 400"
                    height="100%"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_10_20)">
                      <g filter="url(#filter0_f_10_20)">
                        <path
                          d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                          //fill="#03FFE0"
                          fill="#7b14c4"
                        ></path>
                        <path
                          d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                         // fill="#7C87F8"
                         fill="#641ea6"
                        ></path>
                        <path
                          d="M320 400H400V78.75L106.2 134.75L320 400Z"
                         // fill="#4C65E4"
                         fill="#8c49de"
                        ></path>
                        <path
                          d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                         // fill="#043AFF"
                         //fill="#a814c9"
                         fill="#6e1e75"
                        ></path>
                      </g>
                    </g>
                    <defs>
                      <filter
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                        height="720.666"
                        id="filter0_f_10_20"
                        width="720.666"
                        x="-160.333"
                        y="-160.333"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          mode="normal"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          result="effect1_foregroundBlur_10_20"
                          stdDeviation="80.1666"
                        ></feGaussianBlur>
                      </filter>
                    </defs>
                  </svg>

                  <Image priority src={HeroImage} alt="HeroImage" className="relative object-cover w-full border rounded-md shadow-2xl lg:rounded-xl" />
                </div>
            </div>
        </section>
        </>
    )
}