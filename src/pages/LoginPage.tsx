import { BriefcaseBusiness, CheckCircle2, MessageSquare, Video } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage({ onSignIn }: { onSignIn: (redirectTo?: string) => void }) {
  const [email, setEmail] = useState('hari@teamcall.chat');
  const [password, setPassword] = useState('password');
  const [message, setMessage] = useState('');

  function signIn(redirectTo?: string) {
    if (!email.trim() || !password.trim()) {
      setMessage('Enter email and password to continue.');
      return;
    }
    onSignIn(redirectTo);
  }

  function createAccount() {
    if (!email.trim()) {
      setMessage('Enter an email address to create a local prototype account.');
      return;
    }
    setMessage(`Prototype account ready for ${email}. Use any password, then sign in.`);
  }

  function forgotPassword() {
    if (!email.trim()) {
      setMessage('Enter your email address first, then tap Forgot Password.');
      return;
    }
    setMessage(`Password reset simulated for ${email}. For this prototype, use: password`);
  }

  return <main className="flex min-h-screen flex-col items-center justify-center bg-[#120d1d] px-4 py-10 text-[#f5f0ff]">
    <section className="w-full max-w-sm">
      <div className="mx-auto mb-9 grid h-48 w-48 place-items-center rounded-2xl border border-[#45385e] bg-[#1e1432] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 text-xl font-extrabold leading-tight"><span className="grid h-16 w-16 place-items-center rounded-[1.4rem] bg-[#ff40b4] text-white"><BriefcaseBusiness size={34} /></span><span>Team<br /><b className="text-[#ff40b4]">Call&Chat</b></span></div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-extrabold">Connect your team.</h1>
        <p className="mx-auto mt-5 max-w-xs text-base leading-7 text-[#c9badb]">Call, chat and stay organised with the professional standard in digital workspaces.</p>
      </div>
      <div className="mt-12 grid gap-3 rounded-xl border border-[#45385e] bg-[#1e1432] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <input className="rounded-xl border border-[#45385e] bg-[#342456] px-4 py-3 text-[#f5f0ff] placeholder:text-[#c9badb]" placeholder="Email address" value={email} onChange={event => setEmail(event.target.value)} />
        <input className="rounded-xl border border-[#45385e] bg-[#342456] px-4 py-3 text-[#f5f0ff] placeholder:text-[#c9badb]" placeholder="Password" type="password" value={password} onChange={event => setPassword(event.target.value)} onKeyDown={event => event.key === 'Enter' && signIn()} />
        {message && <p className="rounded-xl border border-[#45385e] bg-[#342456] px-3 py-2 text-sm font-semibold text-[#c9badb]">{message}</p>}
        <button className="rounded-xl bg-[#ff40b4] px-4 py-3 font-bold text-white shadow-lg shadow-pink-950/30" onClick={() => signIn()}>Sign In</button>
        <button className="rounded-xl border border-[#45385e] bg-[#342456] px-4 py-3 font-semibold text-[#ff40b4]" onClick={createAccount}>Create Account</button>
        <div className="my-4 flex items-center gap-4 text-xs font-bold text-[#c9badb]"><span className="h-px flex-1 bg-[#45385e]" />OR<span className="h-px flex-1 bg-[#45385e]" /></div>
        <button className="rounded-xl border border-[#45385e] bg-[#342456] px-4 py-3 font-semibold text-[#f5f0ff]" onClick={() => onSignIn('/')}>Sign in with Google</button>
        <button className="mt-4 text-sm font-bold text-[#ff40b4]" onClick={forgotPassword}>Forgot Password?</button>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-semibold text-[#f5f0ff]">
        <button className="inline-flex items-center gap-2 rounded-full border border-[#45385e] bg-[#1e1432] px-4 py-2" onClick={() => signIn('/')}><MessageSquare size={15} className="text-[#ff40b4]" />Instant Chat</button>
        <button className="inline-flex items-center gap-2 rounded-full border border-[#45385e] bg-[#1e1432] px-4 py-2" onClick={() => signIn('/calls')}><Video size={15} className="text-[#ff40b4]" />HD Calls</button>
        <button className="inline-flex items-center gap-2 rounded-full border border-[#45385e] bg-[#1e1432] px-4 py-2" onClick={() => signIn('/meet')}><CheckCircle2 size={15} className="text-[#ff40b4]" />Task Logic</button>
      </div>
    </section>
  </main>;
}
