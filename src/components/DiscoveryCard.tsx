import { Link } from 'react-router-dom';
import { MessageCircle, Phone, UserPlus, Video } from 'lucide-react';
import { DiscoveryProfile } from '../types';
import StatusDot from './StatusDot';
import { canStartPrivateCall } from '../services/discoveryService';

export default function DiscoveryCard({ profile, onConnect }: { profile: DiscoveryProfile; onConnect: (profile: DiscoveryProfile) => void }) {
  const accepted = profile.connectionStatus === 'accepted';
  const canCall = canStartPrivateCall(profile);
  return <article className="overflow-hidden rounded-xl border border-[#45385e] bg-[#1e1432] shadow-lg transition hover:shadow-soft">
    <div className="h-40" style={{ background: profile.photos[0] }} />
    <div className="space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#f5f0ff]">{profile.firstName}, {profile.age}</h2>
          <p className="text-sm text-[#c9badb]">{profile.countryFlag} {profile.city}, {profile.country}</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-[#342456] px-3 py-1 text-xs text-[#f5f0ff]"><StatusDot status={profile.status} />{profile.status}</span>
      </div>
      <p className="text-sm text-[#c9badb]">{profile.nationality} · {profile.profession}</p>
      <div className="flex flex-wrap gap-1">{profile.languages.map(item => <span key={item} className="rounded-full bg-[#342456] px-2 py-1 text-xs text-[#ff40b4]">{item}</span>)}</div>
      <div className="flex flex-wrap gap-1">{profile.interests.map(item => <span key={item} className="rounded-full bg-[#342456] px-2 py-1 text-xs text-[#f5f0ff]">{item}</span>)}</div>
      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#ff40b4] px-3 py-2 text-sm font-semibold text-white disabled:bg-[#45385e]" disabled={profile.connectionStatus !== 'none'} onClick={() => onConnect(profile)}><UserPlus size={16} />{profile.connectionStatus === 'none' ? 'Connect' : profile.connectionStatus.replace('-', ' ')}</button>
        <Link to={`/meet/${profile.id}`} className="rounded-lg border border-[#45385e] px-3 py-2 text-center text-sm font-semibold text-[#ff40b4]">View profile</Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Link className={`flex items-center justify-center rounded-lg p-2 ${accepted ? 'bg-[#342456] text-[#ff40b4]' : 'bg-[#24183a] text-[#7d6e9b]'}`} to={accepted ? `/chats/discovery-${profile.id}` : '#'}><MessageCircle size={17} /></Link>
        <button className={`rounded-lg p-2 ${canCall ? 'bg-[#342456] text-[#ff40b4]' : 'bg-[#24183a] text-[#7d6e9b]'}`} disabled={!canCall}><Phone className="mx-auto" size={17} /></button>
        <Link className={`flex items-center justify-center rounded-lg p-2 ${canCall ? 'bg-[#342456] text-[#ff40b4]' : 'bg-[#24183a] text-[#7d6e9b]'}`} to={canCall ? `/video-call/${profile.id}` : '#'}><Video size={17} /></Link>
      </div>
    </div>
  </article>;
}
