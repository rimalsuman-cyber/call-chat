import { useState } from 'react';
import { Contact } from '../types';
import { validateContact } from '../services/contactService';
import { fileToDataUrl } from '../services/fileUploadService';
import Avatar from './Avatar';

export default function ContactForm({ initial, onSave, onCancel }: { initial: Contact; onSave: (contact: Contact) => void; onCancel: () => void }) {
  const [contact, setContact] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const update = (key: keyof Contact, value: string | boolean) => setContact(prev => ({ ...prev, [key]: value }));
  async function photo(file?: File) {
    if (!file) return;
    try { update('profilePhoto', await fileToDataUrl(file)); } catch (e) { setErrors({ profilePhoto: (e as Error).message }); }
  }
  function submit() {
    const next = validateContact(contact);
    setErrors(next);
    if (!Object.keys(next).length) onSave(contact);
  }
  const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 outline-none focus:border-ocean';
  return <div className="space-y-4">
    <div className="flex items-center gap-4"><Avatar person={contact} size="lg" /><label className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ocean">Upload photo<input className="hidden" type="file" accept="image/*" capture="environment" onChange={e => photo(e.target.files?.[0])} /></label></div>
    {errors.profilePhoto && <p className="text-sm text-rose-600">{errors.profilePhoto}</p>}
    <div className="grid gap-3 md:grid-cols-2">
      {(['fullName','phone','email','personalAddress','officeName','jobTitle','officeAddress','nationality','countryCode','countryFlag'] as (keyof Contact)[]).map(key => <label key={key} className="text-sm font-medium capitalize">{String(key).replace(/([A-Z])/g, ' $1')}<input className={input} value={String(contact[key] ?? '')} onChange={e => update(key, e.target.value)} />{errors[key] && <span className="text-xs text-rose-600">{errors[key]}</span>}</label>)}
    </div>
    <label className="block text-sm font-medium">Notes<textarea className={`${input} min-h-24`} value={contact.notes} onChange={e => update('notes', e.target.value)} /></label>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <select className={input} value={contact.status} onChange={e => update('status', e.target.value)}><option>online</option><option>offline</option><option>busy</option><option>away</option></select>
      <label className="flex items-center gap-2"><input type="checkbox" checked={contact.isFavourite} onChange={e => update('isFavourite', e.target.checked)} />Favourite</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={contact.isEmergency} onChange={e => update('isEmergency', e.target.checked)} />Emergency</label>
    </div>
    <div className="flex justify-end gap-2"><button className="rounded-lg px-4 py-2" onClick={onCancel}>Cancel</button><button className="rounded-lg bg-ocean px-4 py-2 font-semibold text-white" onClick={submit}>Save contact</button></div>
  </div>;
}
