export default function Header({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <header className="sticky top-0 z-10 flex min-h-20 w-full max-w-full items-center justify-between gap-3 overflow-hidden border-b border-line bg-white/92 px-4 py-4 backdrop-blur md:static md:border-0 md:bg-transparent md:px-8 md:py-7">
    <div className="min-w-0 flex-1"><h1 className="truncate text-2xl font-extrabold tracking-normal text-ink md:text-3xl">{title}</h1>{subtitle && <p className="mt-1 truncate text-sm font-medium text-slate-500">{subtitle}</p>}</div>
    <div className="shrink-0">{action}</div>
  </header>;
}
