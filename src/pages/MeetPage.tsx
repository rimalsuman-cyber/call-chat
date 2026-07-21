import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Check, ShieldCheck, Sparkles, X } from 'lucide-react';
import Header from '../components/Header';
import DiscoveryCard from '../components/DiscoveryCard';
import { useApp } from '../hooks';
import { DiscoveryProfile } from '../types';
import { requestConnection } from '../services/discoveryService';

export default function MeetPage() {
  const { state, setState, toast } = useApp();
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  const [interest, setInterest] = useState('all');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [safetyAccepted, setSafetyAccepted] = useState(false);
  const [matching, setMatching] = useState(false);
  const countries = [...new Set(state.discoveryProfiles.map(p => p.country))];
  const languages = [...new Set(state.discoveryProfiles.flatMap(p => p.languages))];
  const interests = [...new Set(state.discoveryProfiles.flatMap(p => p.interests))];
  const profiles = useMemo(() => state.discoveryProfiles.filter(profile => {
    const haystack = `${profile.firstName} ${profile.country} ${profile.nationality} ${profile.city} ${profile.languages.join(' ')} ${profile.interests.join(' ')}`.toLowerCase();
    return haystack.includes(query.toLowerCase())
      && (country === 'all' || profile.country === country)
      && (language === 'all' || profile.languages.includes(language))
      && (interest === 'all' || profile.interests.includes(interest))
      && (!onlineOnly || profile.status === 'online')
      && !state.blockedProfileIds.includes(profile.id);
  }), [state.discoveryProfiles, state.blockedProfileIds, query, country, language, interest, onlineOnly]);

  function connect(profile: DiscoveryProfile) {
    setState(prev => ({
      ...prev,
      discoveryProfiles: prev.discoveryProfiles.map(item => item.id === profile.id ? { ...item, connectionStatus: 'pending-sent' } : item),
      connectionRequests: [requestConnection(profile), ...prev.connectionRequests]
    }));
    toast('Connection request sent', `${profile.firstName} can accept before chat or calls are enabled.`);
  }

  function answer(profileId: string, accepted: boolean) {
    setState(prev => ({
      ...prev,
      discoveryProfiles: prev.discoveryProfiles.map(item => item.id === profileId ? { ...item, connectionStatus: accepted ? 'accepted' : 'none' } : item),
      connectionRequests: prev.connectionRequests.map(item => item.profileId === profileId ? { ...item, status: accepted ? 'accepted' : 'declined' } : item)
    }));
    toast(accepted ? 'Connection accepted' : 'Request declined', accepted ? 'Private chat and calls are now enabled.' : 'No private access was granted.');
  }

  function quickMatch() {
    if (!safetyAccepted) {
      toast('Safety confirmation required', 'Confirm age, terms, camera, and microphone consent before random matching.');
      return;
    }
    setMatching(true);
    window.setTimeout(() => setMatching(false), 2200);
  }

  return <div className="theme-executive">
    <Header title="Meet Friends" subtitle="Discover new people with privacy-first connection controls." action={<Link to="/video-call/d1" className="rounded-2xl bg-[#ff40b4] px-4 py-3 font-bold text-white shadow-lg">Start Video Chat</Link>} />
    <section className="space-y-5 px-4 md:px-8">
      <div className="stitch-card p-4">
        <div className="grid gap-3 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <input className="stitch-input px-4 py-3" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, country, language, interests..." />
          <select className="stitch-input px-3 py-3" value={country} onChange={e => setCountry(e.target.value)}><option value="all">All countries</option>{countries.map(item => <option key={item}>{item}</option>)}</select>
          <select className="stitch-input px-3 py-3" value={language} onChange={e => setLanguage(e.target.value)}><option value="all">All languages</option>{languages.map(item => <option key={item}>{item}</option>)}</select>
          <select className="stitch-input px-3 py-3" value={interest} onChange={e => setInterest(e.target.value)}><option value="all">All interests</option>{interests.map(item => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={onlineOnly} onChange={e => setOnlineOnly(e.target.checked)} />Online now</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.settings.discoveryEnabled} onChange={e => setState(prev => ({ ...prev, settings: { ...prev.settings, discoveryEnabled: e.target.checked } }))} />Discovery mode</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.settings.randomMatchingEnabled} onChange={e => setState(prev => ({ ...prev, settings: { ...prev.settings, randomMatchingEnabled: e.target.checked } }))} />Random matching</label>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{profiles.map(profile => <DiscoveryCard key={profile.id} profile={profile} onConnect={connect} />)}</div>
        <aside className="space-y-4">
          <div className="stitch-card p-4">
            <h2 className="flex items-center gap-2 font-bold"><Sparkles size={18} />Quick Match</h2>
            <p className="mt-2 text-sm text-slate-600">Choose preferred languages, review limited profile details, then both people confirm before any camera starts.</p>
            <label className="mt-4 flex items-start gap-2 text-sm"><input className="mt-1" type="checkbox" checked={safetyAccepted} onChange={e => setSafetyAccepted(e.target.checked)} />I confirm I am old enough to use discovery, accept the terms and community guidelines, and consent to camera/microphone prompts.</label>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff40b4] py-3 font-bold text-white shadow-lg disabled:bg-[#45385e]" disabled={!state.settings.randomMatchingEnabled} onClick={quickMatch}><Camera size={18} />Quick Match</button>
            {matching && <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-center font-bold text-ocean"><div className="mx-auto mb-2 h-10 w-10 animate-ping rounded-full bg-ocean/30" />Searching for a mutually available match...</div>}
          </div>
          <div className="stitch-card p-4">
            <h2 className="flex items-center gap-2 font-bold"><ShieldCheck size={18} />Safety</h2>
            <p className="mt-2 text-sm text-slate-600">Personal address, phone number, email, and office address stay private by default. Calls and messages unlock only after mutual acceptance.</p>
          </div>
          <div className="stitch-card p-4">
            <h2 className="mb-3 font-bold">Requests</h2>
            {state.connectionRequests.filter(r => r.status === 'pending').map(request => {
              const profile = state.discoveryProfiles.find(p => p.id === request.profileId);
              return profile && <div key={request.id} className="mb-2 rounded-lg bg-mist p-3 text-sm"><b>{profile.firstName}</b> · {request.direction === 'received' ? 'wants to connect' : 'request sent'}<div className="mt-2 flex gap-2">{request.direction === 'received' ? <><button className="rounded-lg bg-ocean p-2 text-white" onClick={() => answer(profile.id, true)}><Check size={15} /></button><button className="rounded-lg bg-white p-2 text-slate-600" onClick={() => answer(profile.id, false)}><X size={15} /></button></> : <button className="rounded-lg bg-white px-3 py-2" onClick={() => answer(profile.id, false)}>Cancel</button>}</div></div>;
            })}
          </div>
        </aside>
      </div>
    </section>
  </div>;
}
