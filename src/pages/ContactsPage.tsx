import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Header from '../components/Header';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import { blankContact } from '../services/contactService';
import { useApp } from '../hooks';

export default function ContactsPage() {
  const { state, upsertContact, toast } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [adding, setAdding] = useState(false);
  const contacts = useMemo(() => state.contacts.filter(c => {
    const hay = `${c.fullName} ${c.officeName} ${c.jobTitle} ${c.nationality} ${c.countryCode} ${c.status}`.toLowerCase();
    return hay.includes(query.toLowerCase()) && (filter === 'all' || (filter === 'favourites' ? c.isFavourite : c.status === filter));
  }).sort((a,b) => a.fullName.localeCompare(b.fullName)), [state.contacts, query, filter]);
  return <div>
    <Header title="Team Call&Chat" subtitle={`${contacts.length} people sorted alphabetically`} action={<button className="rounded-2xl bg-ocean p-3 text-white shadow-stitch" onClick={() => setAdding(true)}><Plus /></button>} />
    <section className="space-y-5 px-4 md:px-8">
      <div className="grid gap-3 md:grid-cols-[1fr_220px]"><label className="stitch-input flex items-center gap-4 px-4 py-4 text-slate-500"><Search size={27} /><input className="w-full bg-transparent text-lg outline-none" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search team members, roles, or offices..." /></label><select className="stitch-input px-4 font-bold" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All filters</option><option value="online">Online</option><option value="busy">Busy</option><option value="away">Away</option><option value="offline">Offline</option><option value="favourites">Favourites</option></select></div>
      {adding && <div className="stitch-card p-4"><ContactForm initial={blankContact()} onCancel={() => setAdding(false)} onSave={c => { upsertContact(c); setAdding(false); toast('Contact saved', `${c.fullName} is now in your directory.`); }} /></div>}
      {contacts.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{contacts.map(c => <ContactCard key={c.id} contact={c} />)}</div> : <div className="stitch-card p-8 text-center text-slate-600">No contacts match this search.</div>}
    </section>
  </div>;
}
