import styles from './header.module.scss'

type Props = {
  children: React.ReactNode
  backgroundColor?: 'red' | 'green'
}

export const SectionHeader = ({ children, backgroundColor = 'red' }: Props) => {
  return (
    <header
      data-qx-section-header
      data-qx-section-header-color={backgroundColor}
      className={`${styles.qxSectionHeader}`}
    >
      <div data-qx-section-header-content>{children}</div>
    </header>
  )
}
