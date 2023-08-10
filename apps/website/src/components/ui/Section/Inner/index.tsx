import styles from './inner.module.scss'

type InnerSectionProps = {
  children: React.ReactNode
}

export const InnerSection = ({ children }: InnerSectionProps) => {
  return (
    <div data-qx-inner-section-wrapper className={`${styles.qxInnerSection}`}>
      <div data-qx-inner-section-container>{children}</div>
    </div>
  )
}

export default InnerSection
