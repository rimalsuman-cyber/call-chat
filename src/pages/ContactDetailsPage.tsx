import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Mail, MessageCircle, Pencil, Phone, Star, Trash2, Video } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import ContactForm from '../components/ContactForm';
import StatusDot from '../components/StatusDot';
import { useApp } from '../hooks';

export default function ContactDetailsPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { state, upsertContact, deleteContact, toast } = useApp();
  const [editing, setEditing] = useState(false);
  const contact = state.contacts.find(c => c.id === id);
  if (!contact) return <Navigate to="/contacts" replace />;
  if (editing) return <div><Header title="Edit contact" /><section className="px-4 md:px-8"><div className="stitch-card p-4"><ContactForm initial={contact} onCancel={() => setEditing(false)} onSave={c => { upsertContact(c); setEditing(false); toast('Contact updated', c.fullName); }} /></div></section></div>;
  return <div><Header title={contact.fullName} subtitle={contact.lastSeen} />
    <section className="grid gap-4 px-4 md:grid-cols-[320px_1fr] md:px-8">
      <div className="stitch-card p-6 text-center"><div className="flex justify-center"><Avatar person={contact} size="lg" /></div><h2 className="mt-4 text-2xl font-extrabold">{contact.fullName} <span className="text-base">{contact.countryFlag}</span></h2><p className="mt-1 text-sm font-semibold text-slate-500">{contact.jobTitle} · {contact.officeName}</p><p className="mt-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-ocean"><StatusDot status={contact.status} />{contact.status}</p><div className="mt-8 grid grid-cols-3 gap-3"><Link className="rounded-full bg-ocean p-4 text-white shadow-stitch" to={`/chats/chat-${contact.id}`}><MessageCircle className="mx-auto" /></Link><a className="rounded-full bg-ocean p-4 text-white shadow-stitch" href={`tel:${contact.phone}`}><Phone className="mx-auto" /></a><button className="rounded-full bg-ocean p-4 text-white shadow-stitch"><Video className="mx-auto" /></button></div></div>
      <div className="stitch-card p-5"><div className="grid gap-4 md:grid-cols-2">{[['Telephone', contact.phone], ['Email', contact.email], ['Personal address', contact.personalAddress], ['Office', contact.officeName], ['Position', contact.jobTitle], ['Office address', contact.officeAddress], ['Nationality', contact.nationality], ['Country', `${contact.countryFlag} ${contact.countryCode}`]].map(([k,v]) => <p key={k} className="rounded-xl bg-mist p-3"><span className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">{k}</span><span className="font-bold text-slate-800">{v}</span></p>)}</div><p className="mt-5 rounded-xl bg-white p-3 leading-7"><span className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500">About</span>{contact.notes}</p><div className="mt-6 flex flex-wrap gap-2"><a className="rounded-xl border border-line bg-white px-3 py-2 text-ocean" href={`mailto:${contact.email}`}><Mail size={17} /></a><button className="rounded-xl border border-line bg-white px-3 py-2 text-ocean" onClick={() => upsertContact({ ...contact, isFavourite: !contact.isFavourite })}><Star size={17} /></button><button className="rounded-xl border border-line bg-white px-3 py-2 text-ocean" onClick={() => setEditing(true)}><Pencil size={17} /></button><button className="rounded-xl bg-rose-600 px-3 py-2 text-white" onClick={() => { if (confirm(`Delete ${contact.fullName}? This cannot be undone.`)) { deleteContact(contact.id); toast('Contact deleted', contact.fullName); nav('/contacts'); } }}><Trash2 size={17} /></button></div></div>
    </section></div>;
}
