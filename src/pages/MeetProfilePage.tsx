import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Ban, MessageCircle, ShieldAlert, UserMinus, Video } from 'lucide-react';
import Header from '../components/Header';
import StatusDot from '../components/StatusDot';
import { useApp } from '../hooks';
import { canStartPrivateCall, createReport } from '../services/discoveryService';

export default function MeetProfilePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { state, setState, toast } = useApp();
  const profile = state.discoveryProfiles.find(p => p.id === id);
  if (!profile) return <Navigate to="/meet" replace />;
  const canCall = canStartPrivateCall(profile);
  return <div className="theme-executive">
    <Header title={`${profile.firstName}, ${profile.age}`} subtitle={`${profile.city}, ${profile.country} · ${profile.lastActive}`} />
    <section className="grid gap-4 px-4 md:grid-cols-[360px_1fr] md:px-8">
      <div className="overflow-hidden rounded-xl border border-[#45385e] bg-[#1e1432] shadow-lg"><div className="h-80" style={{ background: profile.photos[0] }} /><div className="p-4"><p className="flex items-center gap-2 text-sm text-[#f5f0ff]"><StatusDot status={profile.status} />{profile.availableForChat ? 'Available for chat' : 'Not available right now'}</p><p className="mt-3 text-[#c9badb]">{profile.intro}</p></div></div>
      <div className="rounded-xl border border-[#45385e] bg-[#1e1432] p-5 shadow-lg">
        <div className="grid gap-4 md:grid-cols-2">{[['Nationality', profile.nationality], ['Country', `${profile.countryFlag} ${profile.country}`], ['City', profile.city], ['Profession', profile.profession], ['Languages', profile.languages.join(', ')], ['Interests', profile.interests.join(', ')], ['Connection', profile.connectionStatus], ['Privacy', 'Private phone, email, home and office address hidden']].map(([k,v]) => <p key={k} className="rounded-xl bg-[#342456] p-3"><span className="block text-xs uppercase text-[#c9badb]">{k}</span><span className="font-medium text-[#f5f0ff]">{v}</span></p>)}</div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className={`flex items-center gap-2 rounded-lg px-3 py-2 ${profile.connectionStatus === 'accepted' ? 'bg-[#342456] text-[#ff40b4]' : 'bg-[#24183a] text-[#7d6e9b]'}`} to={profile.connectionStatus === 'accepted' ? `/chats/discovery-${profile.id}` : '#'}><MessageCircle size={17} />Chat</Link>
          <Link className={`flex items-center gap-2 rounded-lg px-3 py-2 ${canCall ? 'bg-[#ff40b4] text-white' : 'bg-[#24183a] text-[#7d6e9b]'}`} to={canCall ? `/video-call/${profile.id}` : '#'}><Video size={17} />Video call</Link>
          <button className="flex items-center gap-2 rounded-lg bg-[#342456] px-3 py-2 text-[#ff40b4]" onClick={() => { setState(prev => ({ ...prev, safetyReports: [...prev.safetyReports, createReport(profile.id, 'Profile report')] })); toast('Report received', 'Moderation review has been queued.'); }}><ShieldAlert size={17} />Report</button>
          <button className="flex items-center gap-2 rounded-lg bg-[#342456] px-3 py-2 text-[#ff40b4]" onClick={() => setState(prev => ({ ...prev, discoveryProfiles: prev.discoveryProfiles.map(item => item.id === profile.id ? { ...item, connectionStatus: 'none' } : item) }))}><UserMinus size={17} />Remove connection</button>
          <button className="flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-white" onClick={() => { setState(prev => ({ ...prev, blockedProfileIds: [...new Set([...prev.blockedProfileIds, profile.id])] })); toast('User blocked', profile.firstName); nav('/meet'); }}><Ban size={17} />Block</button>
        </div>
      </div>
    </section>
  </div>;
}
