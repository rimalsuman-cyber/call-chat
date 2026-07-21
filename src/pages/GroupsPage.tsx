import { useState } from 'react';
import { Crown, LogOut, Plus, Trash2, Users } from 'lucide-react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import { useApp } from '../hooks';
import { createGroup } from '../services/groupsService';

export default function GroupsPage() {
  const { state, upsertGroup, setState, toast } = useApp();
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  function create() { if (!name.trim() || !selected.length) return; const group = createGroup(name, selected); upsertGroup(group); setName(''); setSelected([]); toast('Group created', group.name); }
  return <div><Header title="Groups" subtitle="Create group chats, manage members, and assign administrators." />
    <section className="grid gap-4 px-4 md:grid-cols-[360px_1fr] md:px-8">
      <div className="rounded-lg border border-line bg-white p-4"><h2 className="mb-3 flex items-center gap-2 font-semibold"><Plus size={18} />New group</h2><input className="mb-3 w-full rounded-lg border border-line px-3 py-2" value={name} onChange={e => setName(e.target.value)} placeholder="Group name" /><div className="grid max-h-72 gap-2 overflow-auto">{state.contacts.map(c => <label key={c.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-mist"><input type="checkbox" checked={selected.includes(c.id)} onChange={e => setSelected(prev => e.target.checked ? [...prev, c.id] : prev.filter(id => id !== c.id))} /><Avatar person={c} size="sm" />{c.fullName}</label>)}</div><button className="mt-4 w-full rounded-lg bg-ocean py-3 font-semibold text-white" onClick={create}>Create group</button></div>
      <div className="grid gap-3">{state.groups.map(g => <article key={g.id} className="rounded-lg border border-line bg-white p-4"><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-ocean"><Users /></div><div className="flex-1"><h2 className="font-semibold">{g.name}</h2><p className="text-sm text-slate-600">{g.description} · {g.memberIds.length} members</p></div><button className="rounded-lg border border-line p-2" onClick={() => setState(prev => ({ ...prev, groups: prev.groups.filter(x => x.id !== g.id) }))}><Trash2 size={17} /></button></div><div className="mt-4 flex flex-wrap gap-2">{g.memberIds.map(id => { const c = state.contacts.find(x => x.id === id); return c && <span key={id} className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-sm">{g.adminIds.includes(id) && <Crown size={14} />}{c.fullName}</span>; })}</div><div className="mt-4 rounded-lg bg-mist p-3 text-sm"><b>Maya:</b> Morning update posted. <br /><b>You:</b> Thanks, I will review before the call.</div><button className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600"><LogOut size={16} />Leave group</button></article>)}</div>
    </section></div>;
}
