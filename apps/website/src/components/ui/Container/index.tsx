import { HTMLAttributes, forwardRef } from 'react'
import Image from 'next/image'
import CloseButtonImg from '@/assets/images/buttons/icon-cancel-over.png'
import { Button } from '..'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  onClose?: () => void
}

export const Container = forwardRef<HTMLDivElement, Props>(
  ({ children, title, className, onClose, ...otherProps }, ref) => {
    const corner =
      "absolute h-[5px] w-[5px] bg-no-repeat bg-[url('../assets/images/borders/box-frame-edge.gif')]"
    const borderSides =
      "block bg-repeat-y absolute top-0 bg-[url('../assets/images/borders/box-frame-vertical.gif')] top-0 h-full w-1"
    const borderAboves =
      "block h-1 w-full bg-[url('../assets/images/borders/table-headline-border.gif')] bg-repeat-x"

    return (
      <div className={`${className}`} ref={ref} {...otherProps}>
        <header className="relative">
          <span className={`${borderAboves}`} />
          <span className={`${borderSides} right-[-1px]`} />
          <span className={`${corner} top-[-1px] right-[-1px]`}></span>
          <span className={`${corner} bottom-[-1px] right-[-1px]`}></span>
          <div className="flex items-center justify-between gap-3 px-3 py-1 bg-700">
            <h1 className="text-sm font-medium text-white font-poppins">
              {title}
            </h1>
            {onClose && (
              <Button className="flex items-center" onClick={onClose}>
                <Image src={CloseButtonImg} alt="close" />
              </Button>
            )}
          </div>
          <span className={`${borderAboves}`} />
          <span className={`${borderSides}`} />
          <span className={`${corner} top-[-1px] left-[-1px]`}></span>
          <span className={`${corner} bottom-[-1px] left-[-1px]`}></span>
        </header>
        <div className="mx-[1px] p-2 border-2 border-t-0 border-quaternary bg-800">
          {children}
        </div>
      </div>
    )
  }
)

Container.displayName = 'Container'

export default Container
