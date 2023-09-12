export const Button = ({ label }: { label: string }) => {
  return (
    <button className="px-4 py-2 text-sm uppercase transition-all border rounded-md border-slate-200 text-slate-200 hover:bg-slate-200 hover:text-slate-900">
      {label}
    </button>
  )
}
