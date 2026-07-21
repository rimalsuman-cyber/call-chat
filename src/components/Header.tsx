export default function Header({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <header className="sticky top-0 z-10 flex min-h-20 items-center justify-between gap-3 border-b border-line bg-white/92 px-4 py-4 backdrop-blur md:static md:border-0 md:bg-transparent md:px-8 md:py-7">
    <div><h1 className="text-2xl font-extrabold tracking-normal text-ink md:text-3xl">{title}</h1>{subtitle && <p className="mt-1 text-sm font-medium text-slate-500">{subtitle}</p>}</div>
    {action}
  </header>;
}
