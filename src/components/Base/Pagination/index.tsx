import type React from "react"
import { twMerge } from "tailwind-merge"
import Button from "../Button"
// import Button from "../Button" // Assuming this Button component exists and works as expected

type PaginationProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"nav">

function Pagination({ className, children }: PaginationProps) {
  return (
    <nav className={className}>
      <ul className="flex w-full mr-0 sm:w-auto sm:mr-auto">{children}</ul>
    </nav>
  )
}

interface LinkProps extends React.PropsWithChildren, React.ComponentPropsWithoutRef<"a"> {
  active?: boolean
  // Add href to ensure it behaves like a proper link
}

Pagination.Link = ({ className, active, children, href, ...anchorProps }: LinkProps) => {
  return (
    <li className="flex-1 sm:flex-initial">
      <Button
        as="a"
        href={href || "#"}
        className={twMerge([
          "min-w-0 sm:min-w-[40px] shadow-none font-normal flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3",
          active && "!box font-medium dark:bg-darkmode-400",
          className,
        ])}
        {...anchorProps} // Pass only anchor (a) props, including onClick
      >
        {children}
      </Button>
    </li>
  )
}

export default Pagination
