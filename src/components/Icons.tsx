import { LucideProps } from 'lucide-react'

export const Icons = {
  underline: (props: LucideProps) => (
    <svg {...props} viewBox='0 0 687 155'>
      <g
        stroke='currentColor'
        strokeWidth='7'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path
          d='M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'
          opacity='.3'></path>
        <path d='M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'></path>
      </g>
    </svg>
  ),
}
//Icon是个object，包含了一个叫underline的属性
//underline是一个函数，参数叫LucideProps，因为是typescript所以要props:
//underline: (props: LucideProps) => ( )会直接return，如果是{}需要加return字符
/**定义了一个名为 underline 的属性，接受 props 参数的函数，props 参数类型为 LucideProps。
 * 这个函数返回一个 svg 元素，该元素通过 {...props} 使用了 JSX 的展开操作符，
 * 将所有传入的 props 属性应用到 svg 元素上。
 * 这样做允许外部控制 svg 的行为和样式，如视图盒子的大小、颜色等，使得这个 svg 元素非常灵活且可重用。*/