import { PhoneCall, PhoneIncoming, PhoneMissed, PhoneOutgoing } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import { useApp } from '../hooks';
import { CallType } from '../types';
import { formatDuration } from '../services/callsService';

const icons = { missed: PhoneMissed, incoming: PhoneIncoming, outgoing: PhoneOutgoing };

export default function CallsPage() {
  const { state } = useApp();
  const [filter, setFilter] = useState<CallType | 'all'>('all');
  const calls = state.calls.filter(c => filter === 'all' || c.type === filter);
  return <div className="min-h-screen dark-purple"><Header title="Calls" subtitle="Prepared for browser voice and video calling with WebRTC later." />
    <section className="px-4 md:px-8"><div className="mb-8 flex w-fit gap-1 rounded-2xl bg-[#24143d] p-1">{(['all','missed','incoming','outgoing'] as const).map(f => <button key={f} className={`rounded-xl px-5 py-2 text-xs font-bold capitalize tracking-wider transition ${filter === f ? 'bg-[#a855f7] text-white shadow-lg shadow-purple-800/30' : 'text-[#c0aed6] hover:bg-[#3a2361]'}`} onClick={() => setFilter(f)}>{f}</button>)}</div><div className="grid gap-4">{calls.map(call => { const contact = state.contacts.find(c => c.id === call.contactId); const Icon = icons[call.type]; return contact && <div key={call.id} className={`flex items-center gap-4 rounded-xl border p-4 transition ${call.type === 'missed' ? 'border-l-4 border-[#ff2d7d] border-y-[#4a3570]/60 border-r-[#4a3570]/60 bg-[#2d1b4d]/60' : 'border-[#4a3570] bg-[#150a24]'}`}><Avatar person={contact} /><Icon className={call.type === 'missed' ? 'text-[#ff2d7d]' : 'text-[#a855f7]'} /><div className="min-w-0 flex-1"><p className={`text-base font-bold ${call.type === 'missed' ? 'text-[#ff2d7d]' : 'text-[#f3e8ff]'}`}>{contact.fullName}</p><p className="text-sm font-medium text-[#c0aed6]">{new Date(call.dateTime).toLocaleString()} · {formatDuration(call.durationSeconds)}</p></div><a className={`rounded-full p-3 text-white shadow-lg ${call.type === 'missed' ? 'bg-[#ff2d7d] shadow-pink-950/40' : 'bg-[#a855f7] shadow-purple-950/40'}`} href={`tel:${contact.phone}`}><PhoneCall size={18} /></a></div>; })}</div></section>
  </div>;
}
