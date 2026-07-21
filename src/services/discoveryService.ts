import { ConnectionRequest, DiscoveryProfile, SafetyReport } from '../types';

export function requestConnection(profile: DiscoveryProfile): ConnectionRequest {
  return {
    id: crypto.randomUUID(),
    profileId: profile.id,
    direction: 'sent',
    status: 'pending',
    createdAt: new Date().toISOString()
  };
}

export function createReport(profileId: string, reason: string): SafetyReport {
  return {
    id: crypto.randomUUID(),
    profileId,
    reason,
    createdAt: new Date().toISOString(),
    status: 'open'
  };
}

export function canStartPrivateCall(profile: DiscoveryProfile) {
  return profile.connectionStatus === 'accepted' && profile.availableForChat;
}
