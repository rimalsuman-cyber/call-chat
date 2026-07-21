import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Ban, Camera, CameraOff, Maximize2, MessageCircle, Mic, MicOff, PhoneOff, RefreshCcw, ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../hooks';
import { createReport } from '../services/discoveryService';

export default function VideoCall() {
  const { personId } = useParams();
  const { state, setState, toast } = useApp();
  const nav = useNavigate();
  const person = state.discoveryProfiles.find(p => p.id === personId) ?? state.contacts.find(c => c.id === personId);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [speaker, setSpeaker] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [controls, setControls] = useState(true);
  const [facing, setFacing] = useState<'user' | 'environment'>('user');
  const [permission, setPermission] = useState('Requesting camera and microphone permission...');
  const [seconds, setSeconds] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds(s => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function openMedia() {
      streamRef.current?.getTracks().forEach(track => track.stop());
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing }, audio: true });
        if (cancelled) return;
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setPermission('Camera and microphone ready.');
      } catch (error) {
        setPermission((error as Error).name === 'NotAllowedError' ? 'Permission denied. Enable camera and microphone to preview yourself.' : 'Camera or microphone unavailable on this device.');
      }
    }
    openMedia();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, [facing]);

  useEffect(() => {
    streamRef.current?.getAudioTracks().forEach(track => track.enabled = !muted);
    streamRef.current?.getVideoTracks().forEach(track => track.enabled = cameraOn);
  }, [muted, cameraOn]);

  useEffect(() => {
    if (!controls) return;
    const timer = window.setTimeout(() => setControls(false), 3500);
    return () => window.clearTimeout(timer);
  }, [controls]);

  if (!person) return null;
  const name = 'firstName' in person ? person.firstName : person.fullName;
  const status = 'status' in person ? person.status : 'online';
  const timer = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  const chatLink = 'firstName' in person ? `/chats/discovery-${person.id}` : `/chats/chat-${person.id}`;

  function endCall() {
    streamRef.current?.getTracks().forEach(track => track.stop());
    nav('/meet');
  }

  return <main className="fixed inset-0 z-50 overflow-hidden bg-slate-950 text-white" onClick={() => setControls(true)}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#42a5f5,transparent_28%),linear-gradient(145deg,#07111f,#1769aa_48%,#0f172a)]" />
    <div className="absolute inset-0 opacity-60" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,.45),transparent 35%,rgba(0,0,0,.75))' }} />
    <section className="relative flex h-full flex-col justify-between p-4 md:p-8">
      <header className={`transition-opacity duration-300 ${controls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-2xl font-bold">{name}</p>
            <p className="text-sm text-white/80">{status} · {timer} · HD connection</p>
          </div>
          <div className="rounded-full bg-emerald-500/25 px-3 py-1 text-sm ring-1 ring-white/20">Quality 96%</div>
        </div>
      </header>
      {permission.includes('unavailable') && <div className="relative mx-auto rounded-lg bg-amber-500/20 px-4 py-3 text-sm ring-1 ring-amber-200/40">Reconnect state: network or device interrupted. Retrying is ready for WebRTC integration.</div>}
      <div className={`absolute right-4 overflow-hidden rounded-2xl bg-slate-900 shadow-soft ring-2 ring-white/40 transition-all md:right-8 ${minimized ? 'bottom-24 h-20 w-28' : 'bottom-32 h-40 w-28 md:h-52 md:w-36'}`}>
        <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
        {!cameraOn && <div className="absolute inset-0 grid place-items-center bg-slate-900 text-xs">Camera off</div>}
      </div>
      <footer className={`relative transition-opacity duration-300 ${controls ? 'opacity-100' : 'opacity-0'}`}>
        <p className="mb-3 text-center text-xs text-white/75">{permission}</p>
        <div className="mx-auto flex max-w-xl items-center justify-center gap-3 rounded-full bg-white/10 p-3 backdrop-blur-md ring-1 ring-white/20">
          <Control label="Mute" onClick={() => setMuted(v => !v)} icon={muted ? <MicOff /> : <Mic />} />
          <Control label="Camera" onClick={() => setCameraOn(v => !v)} icon={cameraOn ? <Camera /> : <CameraOff />} />
          <Control label="Switch camera" onClick={() => setFacing(v => v === 'user' ? 'environment' : 'user')} icon={<RefreshCcw />} />
          <Control label="Speaker" onClick={() => setSpeaker(v => !v)} icon={speaker ? <Volume2 /> : <VolumeX />} />
          <Control label="Minimise" onClick={() => setMinimized(v => !v)} icon={<Maximize2 />} />
          <Link className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur" to={chatLink}><MessageCircle /></Link>
          <Control label="Report" onClick={() => { setState(prev => ({ ...prev, safetyReports: [...prev.safetyReports, createReport(person.id, 'In-call report')] })); toast('Report received', 'Our moderation structure has queued this call for review.'); }} icon={<ShieldAlert />} />
          <Control label="Block" onClick={() => { setState(prev => ({ ...prev, blockedProfileIds: [...new Set([...prev.blockedProfileIds, person.id])] })); toast('User blocked', `${name} can no longer contact you.`); }} icon={<Ban />} />
          <button className="grid h-14 w-14 place-items-center rounded-full bg-rose-600 shadow-lg" onClick={endCall} title="End call"><PhoneOff /></button>
        </div>
      </footer>
    </section>
  </main>;
}

function Control({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return <button className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25" onClick={event => { event.stopPropagation(); onClick(); }} title={label}>{icon}</button>;
}
