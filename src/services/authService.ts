import { AppState } from '../types';

export const authService = {
  signIn(state: AppState) {
    return { ...state, isAuthenticated: true };
  },
  signOut(state: AppState) {
    return { ...state, isAuthenticated: false };
  },
  deleteAccount() {
    localStorage.removeItem('team-call-chat-state');
  }
};
