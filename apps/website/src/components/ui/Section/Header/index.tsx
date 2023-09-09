import { cn } from '@/sdk/utils/tailwind'

type Props = {
  children: React.ReactNode
  backgroundColor?: 'red' | 'green'
}

export const SectionHeader = ({ children, backgroundColor = 'red' }: Props) => {
  const classname = cn({
    'h-7 bg-[url("../assets/images/background/section-header-red.webp")]':
      backgroundColor === 'red',
    'h-6 bg-[url("../assets/images/background/section-header-green.webp")]':
      backgroundColor === 'green',
  })

  return (
    <header className={`${classname} block bg-repeat-x relative`}>
      <div className="absolute flex items-center w-full h-full px-2">
        {children}
      </div>
    </header>
  )
}
