import styles from './section.module.scss'

type Props = {
  children: React.ReactNode
}

export const Section = ({ children }: Props) => {
  return (
    <section className={`${styles.qxSection}`}>
      <span data-fs-corner-image data-fs-corner-image-position="rightUp" />
      <span data-fs-corner-image data-fs-corner-image-position="rightDown" />
      <span data-fs-border-image />
      {children}
      <span data-fs-border-image />
      <span data-fs-corner-image data-fs-corner-image-position="leftUp" />
      <span data-fs-corner-image data-fs-corner-image-position="leftDown" />
    </section>
  )
}

export default Section
