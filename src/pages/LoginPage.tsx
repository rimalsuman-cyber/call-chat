import { BriefcaseBusiness, CheckCircle2, MessageSquare, Video } from 'lucide-react';

export default function LoginPage({ onSignIn }: { onSignIn: () => void }) {
  return <main className="flex min-h-screen flex-col items-center justify-center bg-[#eef4fb] px-4 py-10 text-ink">
    <section className="w-full max-w-sm">
      <div className="mx-auto mb-9 grid h-48 w-48 place-items-center bg-white shadow-stitch">
        <div className="flex items-center gap-2 text-xl font-extrabold leading-tight"><span className="grid h-16 w-16 place-items-center rounded-[1.4rem] bg-navy text-white"><BriefcaseBusiness size={34} /></span><span>Team<br /><b className="text-ocean">Call&Chat</b></span></div>
      </div>
      <div className="text-center">
        <h1 className="font-serif text-2xl font-extrabold">Connect your team.</h1>
        <p className="mx-auto mt-5 max-w-xs text-base leading-7 text-slate-700">Call, chat and stay organised with the professional standard in digital workspaces.</p>
      </div>
      <div className="stitch-card mt-12 grid gap-3 p-8">
        <input className="stitch-input px-4 py-3" placeholder="Email address" defaultValue="hari@teamcall.chat" />
        <input className="stitch-input px-4 py-3" placeholder="Password" type="password" defaultValue="password" />
        <button className="rounded-xl bg-ocean px-4 py-3 font-bold text-white shadow-stitch" onClick={onSignIn}>Sign In</button>
        <button className="rounded-xl border border-line bg-white px-4 py-3 font-semibold text-ocean">Create Account</button>
        <div className="my-4 flex items-center gap-4 text-xs font-bold text-slate-500"><span className="h-px flex-1 bg-line" />OR<span className="h-px flex-1 bg-line" /></div>
        <button className="rounded-xl border border-line bg-white px-4 py-3 font-semibold">Sign in with Google</button>
        <button className="mt-4 text-sm font-bold text-ocean">Forgot Password?</button>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-700">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2"><MessageSquare size={15} className="text-ocean" />Instant Chat</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2"><Video size={15} className="text-ocean" />HD Calls</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2"><CheckCircle2 size={15} className="text-ocean" />Task Logic</span>
      </div>
    </section>
  </main>;
}
