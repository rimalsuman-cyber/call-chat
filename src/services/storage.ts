import { AppState } from '../types';
import { sampleState } from '../data/sampleData';

const KEY = 'team-call-chat-state';

export function loadState(): AppState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return sampleState;
  try {
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...sampleState,
      ...parsed,
      settings: { ...sampleState.settings, ...parsed.settings },
      discoveryProfiles: parsed.discoveryProfiles ?? sampleState.discoveryProfiles,
      connectionRequests: parsed.connectionRequests ?? sampleState.connectionRequests,
      blockedProfileIds: parsed.blockedProfileIds ?? sampleState.blockedProfileIds,
      safetyReports: parsed.safetyReports ?? sampleState.safetyReports
    } as AppState;
  } catch {
    return sampleState;
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
