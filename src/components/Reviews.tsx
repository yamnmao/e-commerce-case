"use client"

import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import Phone from './Phone'
/**
 * Structure：Phone -> Review -> Review Column -> Review Grid -> Reviews
 */


//______Phone_______
/**constant
 * all uppercase, it's a convetion for declaring constant, if you see something like this
 * it means not fetched by api 
*/
const PHONES =[
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg"
]

//<T> generic, array-PHONES(how many phones we have), numParts-Parts
function splitArray<T>(array:Array<T>,numParts:number){
  //two dimension,Array-Columns, Array<T>-Rows
  const result: Array<Array<T>> =[]
  for(let i =0;i<array.length;i++){
    const index = i % numParts
    if(!result[index]){
      result[index]=[]
    }
    result[index].push(array[i]);
  }
  return result;
}

//______Review_______
interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  //每个手机的速度不一样，错开的那种效果
  const POSSIBLE_ANIMATION_DELAYS = [
    '0s',
    '0.1s',
    '0.2s',
    '0.3s',
    '0.4s',
    '0.5s',
  ]
//choose random one delay
  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ]

  return (
    <div
      className={cn(
        'animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5',
        className
      )}
      style={{ animationDelay }}
      {...props}>
        <Phone imgSrc={imgSrc} />
    </div>
  )
}

function ReviewColumn({
  //Props Destructuring takes in props (reviews, className, reviewClassName, and msPerPixel 
  //with a default value of 0) and defines their types using TypeScript.
  reviews,
  className,
  reviewClassName,
  msPerPixel=0
}:{
  //define types of props shown above
  reviews: string[]
  className?: string //optional, string
  reviewClassName?: (reviewIndex:numer)=>string //an optional function that takes a reviewIndex and returns a string.
  msPerPixel?: number
}){
  //A reference columnRef is created to point to a div element, initialized to null initially.
  //columnRef.current refers to the specific DOM element you attach the ref to in React
  const columnRef = useRef<HTMLDivElement | null>(null) 

  //setColumnHeight is used to store the height of the div element.
  const [conlumnHeight, setColumnHeight] = useState(0)

  //calculates the duration of the animation based on the height of the div (columnHeight) and the speed in milliseconds per pixel (msPerPixel).
  const duration=`${conlumnHeight * msPerPixel}ms`
  
  //The ResizeObserver listens for any size changes in the div, updating the columnHeight accordingly.
  //ResizeObserver is a built-in JavaScript API that allows you to monitor the size changes of a DOM element. 
  useEffect(()=>{
    //if columnref == null then !columnRef.current = true，说明没有变化，结束useEffect
    if(!columnRef.current) return

    //if columnref 变化了，更新columnheight
    const resizeObserver = new window.ResizeObserver(()=>{
      //?. is optional chaining, ?? is nullish coalescing operator，这块感觉脱裤子放屁因为前面验证过是否为null了
      //offsetHeight是DOM element的 property，returns the height of an element, including vertical padding and borders, as an integer.
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    });
    //attaches it to the columnRef.current DOM element
    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    }
  },[])

  return (
    <div 
      ref={columnRef} //这个div就是columnRef指的 div
      className={cn("animate-marquee space-y-8 py-4",className)}
      style={{'--marquee-duration':duration} as React.CSSProperties}>
        {//reviews是上面的prop
          reviews.concat(reviews).map((imgSrc, reviewIndex)=>(
          <Review 
            key={reviewIndex} 
            className={reviewClassName?.(
              reviewIndex % reviews.length
            )}
            imgSrc={imgSrc}
          />
          ))
        }
      </div>
    )
}


function ReviewGrid(){
    //HTMLDivElement：a TypeScript type representing a <div> element in the DOM. 
      /**HTMLDivElement根据实时的数据或用户操作来动态改变元素的样式、内容或位置。比如动态背景移动、
       * 视差滚动效果都需要涉及对DOM的操作。CSS只能作用于静态样式和动画设计
       */
    //When using useRef, it ensures the reference will point to a div element or null.
    const containerRef = useRef<HTMLDivElement | null>(null);//The initial value of null indicates that the reference doesn't point to any DOM element until it’s assigned to one
    const isInView = useInView(containerRef,{once:true,amount:0.4});//just show up for once
    const columns = splitArray(PHONES,3);//split PHONES into three columns
    const column1 = columns[0]
    const column2 = columns[1]
    const column3 = splitArray(columns[2],2)

    return (
      <div
      ref={containerRef}
      className='relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 
      items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3'>
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              cn({
                'md:hidden': reviewIndex >= column1.length + column3[0].length,
                'lg:hidden': reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className='hidden md:block'
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className='hidden md:block'
            msPerPixel={10}
          />
        </>
      ) : null}
      <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100' />
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100' />
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