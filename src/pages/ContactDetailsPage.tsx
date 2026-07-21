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
  if (editing) return <div className="theme-executive"><Header title="Edit contact" /><section className="px-4 md:px-8"><div className="stitch-card p-4"><ContactForm initial={contact} onCancel={() => setEditing(false)} onSave={c => { upsertContact(c); setEditing(false); toast('Contact updated', c.fullName); }} /></div></section></div>;
  return <div className="theme-executive"><Header title={contact.fullName} subtitle={contact.lastSeen} />
    <section className="grid gap-4 px-4 md:grid-cols-[320px_1fr] md:px-8">
      <div className="stitch-card p-6 text-center"><div className="flex justify-center"><Avatar person={contact} size="lg" /></div><h2 className="mt-4 text-2xl font-extrabold text-[#f5f0ff]">{contact.fullName} <span className="text-base">{contact.countryFlag}</span></h2><p className="mt-1 text-sm font-semibold text-[#c9badb]">{contact.jobTitle} · {contact.officeName}</p><p className="mt-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff40b4]"><StatusDot status={contact.status} />{contact.status}</p><div className="mt-8 grid grid-cols-3 gap-3"><Link className="rounded-full bg-[#ff40b4] p-4 text-white shadow-lg" to={`/chats/chat-${contact.id}`}><MessageCircle className="mx-auto" /></Link><a className="rounded-full bg-[#ff40b4] p-4 text-white shadow-lg" href={`tel:${contact.phone}`}><Phone className="mx-auto" /></a><button className="rounded-full bg-[#ff40b4] p-4 text-white shadow-lg"><Video className="mx-auto" /></button></div></div>
      <div className="stitch-card p-5"><div className="grid gap-4 md:grid-cols-2">{[['Telephone', contact.phone], ['Email', contact.email], ['Personal address', contact.personalAddress], ['Office', contact.officeName], ['Position', contact.jobTitle], ['Office address', contact.officeAddress], ['Nationality', contact.nationality], ['Country', `${contact.countryFlag} ${contact.countryCode}`]].map(([k,v]) => <p key={k} className="rounded-xl bg-[#342456] p-3"><span className="block text-xs font-extrabold uppercase tracking-wider text-[#c9badb]">{k}</span><span className="font-bold text-[#f5f0ff]">{v}</span></p>)}</div><p className="mt-5 rounded-xl bg-[#342456] p-3 leading-7 text-[#f5f0ff]"><span className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-[#c9badb]">About</span>{contact.notes}</p><div className="mt-6 flex flex-wrap gap-2"><a className="rounded-xl bg-[#342456] px-3 py-2 text-[#ff40b4]" href={`mailto:${contact.email}`}><Mail size={17} /></a><button className="rounded-xl bg-[#342456] px-3 py-2 text-[#ff40b4]" onClick={() => upsertContact({ ...contact, isFavourite: !contact.isFavourite })}><Star size={17} /></button><button className="rounded-xl bg-[#342456] px-3 py-2 text-[#ff40b4]" onClick={() => setEditing(true)}><Pencil size={17} /></button><button className="rounded-xl bg-rose-600 px-3 py-2 text-white" onClick={() => { if (confirm(`Delete ${contact.fullName}? This cannot be undone.`)) { deleteContact(contact.id); toast('Contact deleted', contact.fullName); nav('/contacts'); } }}><Trash2 size={17} /></button></div></div>
    </section></div>;
}
