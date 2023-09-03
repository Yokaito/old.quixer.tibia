type InnerSectionProps = {
  children: React.ReactNode
}

export const InnerSection = ({ children }: InnerSectionProps) => {
  return (
    <div className={`p-1`}>
      <div
        data-qx-inner-section-container
        className="flex flex-col gap-4 p-1 border border-tertiary bg-500"
      >
        {children}
      </div>
    </div>
  )
}

export default InnerSection
