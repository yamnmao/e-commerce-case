"use client"

import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import Phone from './Phone'

function ReviewGrid(){
    //HTMLDivElement：a TypeScript type representing a <div> element in the DOM. 
    //When using useRef, it ensures the reference will point to a div element or null.
    const containerRef = useRef<HTMLDivElement | null>(null);//The initial value of null indicates that the reference doesn't point to any DOM element until it’s assigned to one
    return (
        <div 
            ref={containerRef} 
            className='relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] 
            grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 
            md:grid-cols-2 lg:grid-cols-3'>

        </div>
    )
    //act like a container for review grid
}

export function Reviews() {
    return (
      <MaxWidthWrapper className='relative max-w-5xl'>
        <img
          aria-hidden='true'
          src='/what-people-are-buying.png'
          className='absolute select-none hidden xl:block -left-32 top-1/3'
        />
        <ReviewGrid />
      </MaxWidthWrapper>
    )
  }