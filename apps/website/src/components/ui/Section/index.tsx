import { HTMLAttributes, forwardRef } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Section = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...otherProps }, ref) => {
    const borderImageClass =
      "block bg-repeat border-0 h-[6px] w-full bg-[url('../assets/images/borders/border-1.webp')]"

    const cornerClass =
      "absolute bg-[url('../assets/images/borders/corner.webp')] block bg-no-repeat w-[17px] h-[17px] z-10"

    return (
      <section
        className={`${className} relative border-l-2 border-r-2 bg-400 border-secondary`}
        ref={ref}
        {...otherProps}
      >
        <span className={`${cornerClass} right-[-5px] top-[-4px]`} />
        <span
          className={`${cornerClass} right-[-5px] bottom-[-3px] transform rotate-90`}
        />
        <span className={borderImageClass} />
        {children}
        <span className={borderImageClass} />
        <span
          className={`${cornerClass} left-[-5px] top-[-4px] transform rotate-[270deg]`}
        />
        <span
          className={`${cornerClass} left-[-5px] bottom-[-3px] transform rotate-180`}
        />
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section
