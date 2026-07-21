import { Group } from '../types';

export function createGroup(name: string, memberIds: string[]): Group {
  return { id: crypto.randomUUID(), name, description: 'Private team group', memberIds, adminIds: memberIds.slice(0, 1), createdAt: new Date().toISOString() };
}
