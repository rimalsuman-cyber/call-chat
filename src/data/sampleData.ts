import { AppState } from '../types';

const now = new Date().toISOString();

export const sampleState: AppState = {
  isAuthenticated: false,
  user: {
    id: 'user-current',
    fullName: 'Hari Patel',
    phone: '+41 44 555 0198',
    email: 'hari@teamcall.chat',
    address: 'Seefeldstrasse 24, Zurich',
    officeName: 'Team Call&Chat',
    jobTitle: 'Product Lead',
    nationality: 'Swiss',
    countryFlag: '🇨🇭',
    about: 'Building calmer communication tools for focused teams.'
  },
  settings: {
    notifications: true,
    privacyMode: 'contacts',
    language: 'English',
    appearance: 'light',
    discoveryEnabled: true,
    randomMatchingEnabled: true,
    allowCallsFrom: 'accepted',
    allowMessagesFrom: 'accepted'
  },
  contacts: [
    {
      id: 'c1', fullName: 'Maya Okafor', phone: '+234 801 555 0184', email: 'maya.okafor@northstar.africa',
      personalAddress: '14 Marina Road, Lagos', officeName: 'Northstar Finance', jobTitle: 'Operations Director',
      officeAddress: 'Victoria Island, Lagos', nationality: 'Nigerian', countryCode: 'NG', countryFlag: '🇳🇬',
      notes: 'Prefers concise morning updates. Emergency escalation owner for West Africa.', status: 'online',
      lastSeen: 'Online now', isFavourite: true, isEmergency: true, createdAt: now, updatedAt: now
    },
    {
      id: 'c2', fullName: 'Jonas Keller', phone: '+49 30 5557 2041', email: 'jonas.keller@alpinegrid.de',
      personalAddress: 'Kastanienallee 18, Berlin', officeName: 'Alpine Grid', jobTitle: 'Senior Engineer',
      officeAddress: 'Potsdamer Platz 3, Berlin', nationality: 'German', countryCode: 'DE', countryFlag: '🇩🇪',
      notes: 'Backend owner. Usually available after 10:00 CET.', status: 'busy',
      lastSeen: 'Last seen 08:45', isFavourite: true, isEmergency: false, createdAt: now, updatedAt: now
    },
    {
      id: 'c3', fullName: 'Sofia Martinez', phone: '+34 91 555 3381', email: 'sofia.martinez@iberiahealth.es',
      personalAddress: 'Calle Atocha 44, Madrid', officeName: 'Iberia Health', jobTitle: 'People Partner',
      officeAddress: 'Gran Via 12, Madrid', nationality: 'Spanish', countryCode: 'ES', countryFlag: '🇪🇸',
      notes: 'Keeps onboarding lists and HR contacts current.', status: 'away',
      lastSeen: 'Away for lunch', isFavourite: false, isEmergency: false, createdAt: now, updatedAt: now
    },
    {
      id: 'c4', fullName: 'Aiko Tanaka', phone: '+81 3 5555 7260', email: 'aiko.tanaka@tokyoworks.jp',
      personalAddress: 'Shibuya 2-3-4, Tokyo', officeName: 'Tokyo Works', jobTitle: 'Design Manager',
      officeAddress: 'Roppongi Hills, Tokyo', nationality: 'Japanese', countryCode: 'JP', countryFlag: '🇯🇵',
      notes: 'Owns design reviews and brand QA.', status: 'offline',
      lastSeen: 'Last seen yesterday', isFavourite: false, isEmergency: false, createdAt: now, updatedAt: now
    }
  ],
  chats: [
    { id: 'chat-c1', contactId: 'c1', unreadCount: 2, updatedAt: now },
    { id: 'chat-c2', contactId: 'c2', unreadCount: 0, updatedAt: now },
    { id: 'chat-c3', contactId: 'c3', unreadCount: 1, updatedAt: now }
  ],
  messages: [
    { id: 'm1', chatId: 'chat-c1', senderId: 'c1', senderName: 'Maya Okafor', text: 'Can you review the emergency contact list today?', timestamp: now, status: 'read' },
    { id: 'm2', chatId: 'chat-c1', senderId: 'user-current', senderName: 'Hari Patel', text: 'Yes, I will clean up the Lagos entries before standup.', timestamp: now, status: 'delivered' },
    { id: 'm3', chatId: 'chat-c2', senderId: 'c2', senderName: 'Jonas Keller', text: 'The call handoff notes are in the shared folder.', timestamp: now, status: 'read', attachmentType: 'document', attachmentName: 'handoff-notes.pdf' },
    { id: 'm4', chatId: 'chat-c3', senderId: 'c3', senderName: 'Sofia Martinez', text: 'New starter profile is ready for approval.', timestamp: now, status: 'delivered' }
  ],
  groups: [
    { id: 'g1', name: 'Operations Leads', description: 'Daily operational coordination.', memberIds: ['c1', 'c2', 'c3'], adminIds: ['c1'], createdAt: now }
  ],
  calls: [
    { id: 'call1', contactId: 'c1', type: 'incoming', dateTime: now, durationSeconds: 362 },
    { id: 'call2', contactId: 'c2', type: 'missed', dateTime: now, durationSeconds: 0 },
    { id: 'call3', contactId: 'c3', type: 'outgoing', dateTime: now, durationSeconds: 915 }
  ],
  discoveryProfiles: [
    {
      id: 'd1',
      firstName: 'Lea',
      age: 29,
      nationality: 'Swiss',
      country: 'Switzerland',
      countryFlag: 'CH',
      city: 'Zurich',
      profession: 'Product strategist',
      intro: 'I like thoughtful product chats, hiking routes, and language exchanges.',
      languages: ['English', 'German', 'French'],
      interests: ['Product', 'Hiking', 'Coffee'],
      availableForChat: true,
      status: 'online',
      lastActive: 'Online now',
      connectionStatus: 'accepted',
      photos: ['linear-gradient(145deg,#1769aa,#8bd3ff)'],
      safetyAccepted: true
    },
    {
      id: 'd2',
      firstName: 'Noah',
      age: 34,
      nationality: 'Canadian',
      country: 'Canada',
      countryFlag: 'CA',
      city: 'Toronto',
      profession: 'Engineering manager',
      intro: 'Remote work, distributed systems, and calm team rituals.',
      languages: ['English', 'Spanish'],
      interests: ['Engineering', 'Mentoring', 'Music'],
      availableForChat: true,
      status: 'away',
      lastActive: 'Active 18 min ago',
      connectionStatus: 'pending-received',
      photos: ['linear-gradient(145deg,#16324f,#5eead4)']
    },
    {
      id: 'd3',
      firstName: 'Amara',
      age: 27,
      nationality: 'Kenyan',
      country: 'Kenya',
      countryFlag: 'KE',
      city: 'Nairobi',
      profession: 'Community lead',
      intro: 'Always happy to talk about community operations and inclusive events.',
      languages: ['English', 'Swahili'],
      interests: ['Community', 'Travel', 'Design'],
      availableForChat: false,
      status: 'offline',
      lastActive: 'Active yesterday',
      connectionStatus: 'none',
      photos: ['linear-gradient(145deg,#0f766e,#f9a8d4)']
    },
    {
      id: 'd4',
      firstName: 'Mateo',
      age: 31,
      nationality: 'Argentinian',
      country: 'Argentina',
      countryFlag: 'AR',
      city: 'Buenos Aires',
      profession: 'UX researcher',
      intro: 'Research systems, football analytics, and conversational Spanish practice.',
      languages: ['Spanish', 'English', 'Portuguese'],
      interests: ['Research', 'Football', 'Languages'],
      availableForChat: true,
      status: 'online',
      lastActive: 'Online now',
      connectionStatus: 'pending-sent',
      photos: ['linear-gradient(145deg,#1d4ed8,#fbbf24)']
    }
  ],
  connectionRequests: [
    { id: 'r1', profileId: 'd2', direction: 'received', status: 'pending', createdAt: now },
    { id: 'r2', profileId: 'd4', direction: 'sent', status: 'pending', createdAt: now }
  ],
  blockedProfileIds: [],
  safetyReports: [],
  notifications: []
};
