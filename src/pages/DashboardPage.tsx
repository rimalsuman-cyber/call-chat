import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import StatusDot from '../components/StatusDot';
import { useApp } from '../hooks';

export default function DashboardPage() {
  const { state } = useApp();
  const recent = state.chats.map(chat => ({ chat, contact: state.contacts.find(c => c.id === chat.contactId) })).filter(x => x.contact);
  return <div>
    <Header title="Team Call&Chat" subtitle="Recent conversations, favourites, and online teammates." action={<Link to="/contacts" className="rounded-2xl bg-ocean p-3 text-white shadow-stitch"><Plus /></Link>} />
    <section className="px-4 md:px-8">
      <label className="stitch-input mb-7 flex items-center gap-4 px-4 py-4 text-slate-500"><Search size={28} /><input className="w-full bg-transparent text-lg outline-none" placeholder="Search messages, teams, or files..." /></label>
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="stitch-card overflow-hidden p-0">
          {recent.map(({ chat, contact }) => contact && <Link key={chat.id} to={`/chats/${chat.id}`} className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50">
            <Avatar person={contact} /><div className="min-w-0 flex-1"><p className="text-lg font-extrabold">{contact.fullName}</p><p className="truncate text-sm text-slate-600">{state.messages.filter(m => m.chatId === chat.id).at(-1)?.text}</p></div>{chat.unreadCount > 0 && <span className="rounded-full bg-ocean px-2 py-1 text-xs font-bold text-white">{chat.unreadCount}</span>}
          </Link>)}
        </div>
        <div className="grid gap-4">
          <Panel title="Favourite contacts">{state.contacts.filter(c => c.isFavourite).map(c => <Mini key={c.id} contact={c} />)}</Panel>
          <Panel title="Online team members">{state.contacts.filter(c => c.status === 'online').map(c => <Mini key={c.id} contact={c} />)}</Panel>
        </div>
      </div>
    </section>
  </div>;
}
function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <div className="stitch-card p-4"><h2 className="mb-4 text-xl font-extrabold">{title}</h2><div className="grid gap-3">{children}</div></div>; }
function Mini({ contact }: { contact: import('../types').Contact }) { return <Link to={`/contacts/${contact.id}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-blue-50"><Avatar person={contact} size="sm" /><span className="flex-1 font-bold">{contact.fullName}</span><StatusDot status={contact.status} /></Link>; }
