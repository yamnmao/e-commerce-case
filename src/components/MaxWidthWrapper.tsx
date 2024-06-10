import { ReactNode } from "react"
import { cn } from "../lib/utils"
//{}:{type for typescript}, ?: means optional, doesn't need to exist, if does, then here is the type
export const MaxWidthWrapper=({
    className,
    children
}:{
    className?:string,
    children:ReactNode
})=> {
    //cn(....),we can pass arguments here
    //md:px-20, tailwind is mobile first
    return <div className={cn(
        "h-full w-full max-w-screen-xl mx-auto px-2.5 md:px-20",
        className
        )}>
            {children}
    </div>
}