import { PresenceStatus } from '../types';

const map: Record<PresenceStatus, string> = { online: 'bg-emerald-500', busy: 'bg-rose-500', away: 'bg-amber-500', offline: 'bg-slate-400' };

export default function StatusDot({ status }: { status: PresenceStatus }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${map[status]}`} title={status} />;
}
