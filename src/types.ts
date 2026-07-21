export type PresenceStatus = 'online' | 'offline' | 'busy' | 'away';
export type CallType = 'missed' | 'incoming' | 'outgoing';
export type ConnectionStatus = 'none' | 'pending-sent' | 'pending-received' | 'accepted' | 'blocked';

export interface User {
  id: string;
  fullName: string;
  profilePhoto?: string;
  phone: string;
  email: string;
  address: string;
  officeName: string;
  jobTitle: string;
  nationality: string;
  countryFlag: string;
  about: string;
}

export interface Contact {
  id: string;
  fullName: string;
  profilePhoto?: string;
  phone: string;
  email: string;
  personalAddress: string;
  officeName: string;
  jobTitle: string;
  officeAddress: string;
  nationality: string;
  countryCode: string;
  countryFlag: string;
  notes: string;
  status: PresenceStatus;
  lastSeen: string;
  isFavourite: boolean;
  isEmergency: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: string;
  contactId: string;
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachmentType?: 'image' | 'document';
  attachmentName?: string;
  replyTo?: string;
}

export interface Group {
  id: string;
  name: string;
  photo?: string;
  description: string;
  memberIds: string[];
  adminIds: string[];
  createdAt: string;
}

export interface GroupMember {
  groupId: string;
  contactId: string;
  role: 'admin' | 'member';
}

export interface CallRecord {
  id: string;
  contactId: string;
  type: CallType;
  dateTime: string;
  durationSeconds: number;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface UserSettings {
  notifications: boolean;
  privacyMode: 'everyone' | 'contacts' | 'nobody';
  language: string;
  appearance: 'light' | 'dark';
  discoveryEnabled: boolean;
  randomMatchingEnabled: boolean;
  allowCallsFrom: 'accepted' | 'contacts' | 'nobody';
  allowMessagesFrom: 'accepted' | 'contacts' | 'nobody';
}

export interface DiscoveryProfile {
  id: string;
  firstName: string;
  age: number;
  nationality: string;
  country: string;
  countryFlag: string;
  city: string;
  profession: string;
  intro: string;
  languages: string[];
  interests: string[];
  availableForChat: boolean;
  status: PresenceStatus;
  lastActive: string;
  connectionStatus: ConnectionStatus;
  photos: string[];
  safetyAccepted?: boolean;
}

export interface ConnectionRequest {
  id: string;
  profileId: string;
  direction: 'sent' | 'received';
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  createdAt: string;
}

export interface SafetyReport {
  id: string;
  profileId: string;
  reason: string;
  createdAt: string;
  status: 'open' | 'reviewing' | 'resolved';
}

export interface AppState {
  user: User;
  contacts: Contact[];
  chats: Chat[];
  messages: Message[];
  groups: Group[];
  calls: CallRecord[];
  discoveryProfiles: DiscoveryProfile[];
  connectionRequests: ConnectionRequest[];
  blockedProfileIds: string[];
  safetyReports: SafetyReport[];
  notifications: AppNotification[];
  settings: UserSettings;
  isAuthenticated: boolean;
}
