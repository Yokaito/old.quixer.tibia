import { BorderBox } from '@/components/ui/'
import { cn } from '@/sdk/utils/tailwind'

type MenuBoxProps = {
  /**
   * Show chain
   * @default false
   */
  showChain?: boolean
  /**
   * Show background image
   * @default true
   */
  showBackground?: boolean
  /**
   * Children
   * @default null
   */
  children: React.ReactNode
}

export const MenuBox = ({
  children,
  showChain = false,
  showBackground = true,
}: MenuBoxProps) => {
  const classContent = cn({
    'w-[160px] h-full relative px-2 py-0 flex flex-col items-center justify-center':
      true,
    "bg-repeat-y bg-[url('../assets/images/background/loginbox-textfield.webp')]":
      showBackground,
  })

  const classChain = cn({
    "absolute bg-repeat-y w-[7px] h-full top-0 bg-[url('../assets/images/borders/chain.webp')]":
      true,
  })

  return (
    <div className={`flex flex-col w-[180px] items-center`}>
      <BorderBox />
      <div className={`${classContent}`}>
        {showChain && <div className={`${classChain} left-[-4px]`} />}

        {children}
        {showChain && (
          <div className={`${classChain} left-auto right-[-4px]`} />
        )}
      </div>
      <BorderBox inverted />
    </div>
  )
}

export default MenuBox
