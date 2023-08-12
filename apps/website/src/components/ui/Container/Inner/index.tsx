import styles from './inner.module.scss'

type InnerContainerProps = {
  children: React.ReactNode
}

export const InnerContainer = ({ children }: InnerContainerProps) => {
  return <div className={`${styles.qxInnerContainer}`}>{children}</div>
}

export default InnerContainer
