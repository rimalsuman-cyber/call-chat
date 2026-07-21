import { Link } from 'react-router-dom';
import { MessageCircle, Phone, UserPlus, Video } from 'lucide-react';
import { DiscoveryProfile } from '../types';
import StatusDot from './StatusDot';
import { canStartPrivateCall } from '../services/discoveryService';

export default function DiscoveryCard({ profile, onConnect }: { profile: DiscoveryProfile; onConnect: (profile: DiscoveryProfile) => void }) {
  const accepted = profile.connectionStatus === 'accepted';
  const canCall = canStartPrivateCall(profile);
  return <article className="overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:shadow-soft">
    <div className="h-40" style={{ background: profile.photos[0] }} />
    <div className="space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{profile.firstName}, {profile.age}</h2>
          <p className="text-sm text-slate-600">{profile.countryFlag} {profile.city}, {profile.country}</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-mist px-3 py-1 text-xs"><StatusDot status={profile.status} />{profile.status}</span>
      </div>
      <p className="text-sm text-slate-700">{profile.nationality} · {profile.profession}</p>
      <div className="flex flex-wrap gap-1">{profile.languages.map(item => <span key={item} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-ocean">{item}</span>)}</div>
      <div className="flex flex-wrap gap-1">{profile.interests.map(item => <span key={item} className="rounded-full bg-mist px-2 py-1 text-xs">{item}</span>)}</div>
      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-2 rounded-lg bg-ocean px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300" disabled={profile.connectionStatus !== 'none'} onClick={() => onConnect(profile)}><UserPlus size={16} />{profile.connectionStatus === 'none' ? 'Connect' : profile.connectionStatus.replace('-', ' ')}</button>
        <Link to={`/meet/${profile.id}`} className="rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold text-ocean">View profile</Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Link className={`flex items-center justify-center rounded-lg p-2 ${accepted ? 'bg-blue-50 text-ocean' : 'bg-slate-100 text-slate-400'}`} to={accepted ? `/chats/discovery-${profile.id}` : '#'}><MessageCircle size={17} /></Link>
        <button className={`rounded-lg p-2 ${canCall ? 'bg-blue-50 text-ocean' : 'bg-slate-100 text-slate-400'}`} disabled={!canCall}><Phone className="mx-auto" size={17} /></button>
        <Link className={`flex items-center justify-center rounded-lg p-2 ${canCall ? 'bg-blue-50 text-ocean' : 'bg-slate-100 text-slate-400'}`} to={canCall ? `/video-call/${profile.id}` : '#'}><Video size={17} /></Link>
      </div>
    </div>
  </article>;
}
