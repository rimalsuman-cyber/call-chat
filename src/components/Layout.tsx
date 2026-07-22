import { NavLink, Outlet } from 'react-router-dom';
import { BriefcaseBusiness, MessageCircle, Phone, Sparkles, UserCircle, ContactRound } from 'lucide-react';
import { useApp } from '../hooks';

const nav = [
  { to: '/', label: 'Chats', icon: MessageCircle },
  { to: '/contacts', label: 'Contacts', icon: ContactRound },
  { to: '/meet', label: 'Meet', icon: Sparkles },
  { to: '/calls', label: 'Calls', icon: Phone },
  { to: '/profile', label: 'Profile', icon: UserCircle }
];

export default function Layout() {
  const { state } = useApp();
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-mist text-ink md:flex">
      <aside className="hidden md:flex md:w-72 md:flex-col md:bg-navy md:text-white">
        <div className="flex items-center gap-3 p-6 text-xl font-extrabold tracking-tight"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-ocean"><BriefcaseBusiness size={23} /></span>Team Call&Chat</div>
        <nav className="grid gap-1 px-3">{nav.map(item => <NavItem key={item.to} {...item} />)}</nav>
        <div className="mx-4 mb-5 mt-auto rounded-2xl bg-white/10 p-4 text-sm text-white/75">{state.user.fullName}<br /><span className="text-white/50">{state.user.jobTitle}</span></div>
      </aside>
      <main className="mx-auto min-h-screen w-full max-w-6xl min-w-0 overflow-x-hidden pb-24 md:pb-0">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid h-20 max-w-full grid-cols-5 border-t border-line bg-white/95 px-2 pb-2 pt-1 backdrop-blur md:hidden">
        {nav.map(item => <NavItem key={item.to} {...item} compact />)}
      </nav>
    </div>
  );
}

function NavItem({ to, label, icon: Icon, compact }: { to: string; label: string; icon: typeof MessageCircle; compact?: boolean }) {
  return <NavLink to={to} className={({ isActive }) => `flex ${compact ? 'flex-col text-[12px]' : 'rounded-xl px-4 py-3 text-sm uppercase tracking-wide'} items-center justify-center gap-1.5 transition ${isActive ? (compact ? 'text-ocean font-bold' : 'bg-white text-navy font-bold shadow-stitch') : (compact ? 'text-slate-700' : 'text-white/65 hover:bg-white/10 hover:text-white')}`}><Icon size={compact ? 22 : 20} /><span>{label}</span></NavLink>;
}
