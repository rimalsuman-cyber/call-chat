import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { Contact } from '../types';
import Avatar from './Avatar';
import StatusDot from './StatusDot';

export default function ContactCard({ contact }: { contact: Contact }) {
  return <article className="stitch-card p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
    <div className="flex gap-4">
      <Avatar person={contact} />
      <div className="min-w-0 flex-1">
        <Link to={`/contacts/${contact.id}`} className="text-lg font-extrabold hover:text-ocean">{contact.fullName}</Link>
        <p className="truncate text-sm font-medium text-slate-700">{contact.jobTitle}</p>
        <p className="truncate text-xs font-semibold uppercase tracking-wider text-slate-500">{contact.officeName}</p>
        <p className="mt-2 flex items-center gap-2 text-sm"><StatusDot status={contact.status} />{contact.countryFlag} {contact.nationality}</p>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2">
      <a className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-bold text-ocean" href={`tel:${contact.phone}`}><Phone size={16} />Call</a>
      <Link className="flex items-center justify-center gap-2 rounded-xl bg-ocean py-2.5 text-sm font-bold text-white shadow-stitch" to={`/chats/chat-${contact.id}`}><MessageCircle size={16} />Message</Link>
    </div>
  </article>;
}
