import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Camera, Copy, FileText, Forward, Mic, Paperclip, Search, Send, Smile, Trash2 } from 'lucide-react';
import Avatar from '../components/Avatar';
import StatusDot from '../components/StatusDot';
import { useApp } from '../hooks';
import { createMessage } from '../services/messageService';

export default function ChatPage() {
  const { chatId } = useParams();
  const { state, addMessage, toast } = useApp();
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const existingChat = state.chats.find(c => c.id === chatId);
  const contactForNewChat = state.contacts.find(c => `chat-${c.id}` === chatId);
  const discoveryProfile = state.discoveryProfiles.find(p => `discovery-${p.id}` === chatId && p.connectionStatus === 'accepted');
  const chat = existingChat ?? (contactForNewChat && chatId ? { id: chatId, contactId: contactForNewChat.id, unreadCount: 0, updatedAt: new Date().toISOString() } : undefined);
  const contact = chat && state.contacts.find(c => c.id === chat.contactId);
  const person = contact ?? discoveryProfile;
  const activeChatId = chat?.id ?? chatId;
  const messages = useMemo(() => state.messages.filter(m => m.chatId === activeChatId && m.text.toLowerCase().includes(search.toLowerCase())), [state.messages, activeChatId, search]);
  if (!activeChatId || !person) return <Navigate to="/contacts" replace />;
  const displayName = 'fullName' in person ? person.fullName : person.firstName;
  const detailLink = 'fullName' in person ? `/contacts/${person.id}` : `/meet/${person.id}`;
  function send() { if (!text.trim() || !activeChatId || !person) return; addMessage(createMessage(activeChatId, text)); setText(''); toast('Message sent', `Delivered to ${displayName}`); }
  return <div className="flex h-screen flex-col dark-executive md:h-[100vh]">
    <header className="flex min-h-20 items-center gap-3 border-b border-[#44474e] bg-[#0b0e11] px-4 py-3 shadow-sm md:px-8"><Avatar person={{ fullName: displayName }} /><div className="min-w-0 flex-1"><Link to={detailLink} className="text-base font-bold text-[#e2e2e6]">{displayName}</Link><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c4c6d0]"><StatusDot status={person.status} />{person.status === 'online' ? 'Online' : ('lastSeen' in person ? person.lastSeen : person.lastActive)}</p></div><label className="hidden items-center gap-2 rounded-full bg-[#282a2f] px-4 py-2 text-[#c4c6d0] md:flex"><Search size={16} /><input className="bg-transparent outline-none" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages" /></label></header>
    <section className="scrollbar-thin flex-1 space-y-6 overflow-y-auto bg-[#0b1c30] p-4 md:px-8">
      <div className="flex justify-center"><span className="rounded-full bg-[#282a2f] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#c4c6d0]">Today</span></div>
      {messages.map(m => <div key={m.id} className={`flex ${m.senderId === 'user-current' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-lg ${m.senderId === 'user-current' ? 'rounded-br bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] text-white' : 'rounded-bl border border-white/10 bg-[#581c87]/40 text-[#e2e2e6] backdrop-blur'}`}><p>{m.text}</p>{m.attachmentName && <p className="mt-2 flex gap-1 text-xs"><FileText size={14} />{m.attachmentName}</p>}<div className="mt-2 flex items-center justify-between gap-3 text-xs opacity-75"><span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {m.status}</span><span className="flex gap-2"><button onClick={() => navigator.clipboard?.writeText(m.text)}><Copy size={13} /></button><button><Forward size={13} /></button><button><Trash2 size={13} /></button></span></div></div></div>)}
      <p className="pl-2 text-sm text-[#c4c6d0]">{displayName.split(' ')[0]} is typing...</p>
    </section>
    <footer className="border-t border-[#44474e] bg-[#0b0e11] p-3 md:px-8"><div className="flex items-center gap-2"><button className="rounded-full p-2 text-[#b4c5ff]"><Smile /></button><button className="rounded-full p-2 text-[#b4c5ff]"><Paperclip /></button><button className="rounded-full p-2 text-[#b4c5ff]"><Camera /></button><input className="min-w-0 flex-1 rounded-full border border-[#44474e] bg-[#1e2025] px-4 py-3 text-[#e2e2e6] outline-none focus:border-[#b4c5ff]" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Message" /><button className="rounded-full p-2 text-[#b4c5ff]"><Mic /></button><button className="rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] p-3 text-white shadow-lg" onClick={send}><Send size={19} /></button></div></footer>
  </div>;
}
