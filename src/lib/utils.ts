import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**cn: This is a utility function for conditionally joining class names. 
 * It's often short for classNames, a popular library that helps apply multiple classes conditionally.
 * cn('class1', condition && 'class2') // Joins 'class1' and 'class2' if `condition` is true
*/