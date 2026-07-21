import { Contact, User } from '../types';

export default function Avatar({ person, size = 'md' }: { person: Pick<Contact | User, 'fullName' | 'profilePhoto'>; size?: 'sm' | 'md' | 'lg' }) {
  const initials = person.fullName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  const cls = size === 'lg' ? 'h-24 w-24 text-2xl' : size === 'sm' ? 'h-10 w-10 text-sm' : 'h-12 w-12 text-base';
  if (person.profilePhoto) return <img className={`${cls} rounded-full object-cover ring-2 ring-white`} src={person.profilePhoto} alt={person.fullName} />;
  return <div className={`${cls} grid place-items-center rounded-full bg-ocean text-white font-semibold ring-2 ring-white`}>{initials}</div>;
}
