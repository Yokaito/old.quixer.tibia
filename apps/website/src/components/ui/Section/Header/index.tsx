import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  backgroundColor?: 'red' | 'green'
}

export const SectionHeader = ({ children, backgroundColor = 'red' }: Props) => {
  const classname = classNames({
    'h-7 bg-[url("../assets/images/background/section-header-red.webp")]':
      backgroundColor === 'red',
    'h-6 bg-[url("../assets/images/background/section-header-green.webp")]':
      backgroundColor === 'green',
  })

  return (
    <header
      data-qx-section-header
      data-qx-section-header-color={backgroundColor}
      className={`${classname} block bg-repeat-x relative`}
    >
      <div
        data-qx-section-header-content
        className="absolute block w-full h-full px-2"
      >
        {children}
      </div>
    </header>
  )
}
