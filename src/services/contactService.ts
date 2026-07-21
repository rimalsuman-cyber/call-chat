import { Contact } from '../types';

export const blankContact = (): Contact => {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(), fullName: '', phone: '', email: '', personalAddress: '', officeName: '',
    jobTitle: '', officeAddress: '', nationality: '', countryCode: '', countryFlag: '🏳️', notes: '',
    status: 'offline', lastSeen: 'Not seen yet', isFavourite: false, isEmergency: false, createdAt: now, updatedAt: now
  };
};

export function validateContact(contact: Contact) {
  const errors: Partial<Record<keyof Contact, string>> = {};
  if (contact.fullName.trim().length < 2) errors.fullName = 'Enter a full name.';
  if (!/^\+?[0-9 ()-]{7,}$/.test(contact.phone)) errors.phone = 'Enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errors.email = 'Enter a valid email address.';
  return errors;
}
