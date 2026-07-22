import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppState, Contact, Group, Message } from './types';
import { loadState, saveState } from './services/storage';
import { authService } from './services/authService';
import { createToast } from './services/notificationsService';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import ContactDetailsPage from './pages/ContactDetailsPage';
import ChatPage from './pages/ChatPage';
import GroupsPage from './pages/GroupsPage';
import CallsPage from './pages/CallsPage';
import ProfilePage from './pages/ProfilePage';
import MeetPage from './pages/MeetPage';
import MeetProfilePage from './pages/MeetProfilePage';
import VideoCall from './components/VideoCall';

export interface AppContextValue {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  toast: (title: string, body: string) => void;
  upsertContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
  addMessage: (message: Message) => void;
  upsertGroup: (group: Group) => void;
}

export const AppContext = React.createContext<AppContextValue | null>(null);

function Protected({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(AppContext)!;
  return ctx.state.isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [state, setState] = useState(loadState);
  const navigate = useNavigate();

  useEffect(() => saveState(state), [state]);

  const value = useMemo<AppContextValue>(() => ({
    state,
    setState,
    toast: (title, body) => setState(prev => ({ ...prev, notifications: [createToast(title, body), ...prev.notifications].slice(0, 4) })),
    upsertContact: (contact) => setState(prev => {
      const exists = prev.contacts.some(c => c.id === contact.id);
      const updated = { ...contact, updatedAt: new Date().toISOString() };
      return { ...prev, contacts: exists ? prev.contacts.map(c => c.id === contact.id ? updated : c) : [updated, ...prev.contacts] };
    }),
    deleteContact: (id) => setState(prev => ({
      ...prev,
      contacts: prev.contacts.filter(c => c.id !== id),
      chats: prev.chats.filter(c => c.contactId !== id),
      calls: prev.calls.filter(c => c.contactId !== id)
    })),
    addMessage: (message) => setState(prev => ({ ...prev, messages: [...prev.messages, message], chats: prev.chats.map(c => c.id === message.chatId ? { ...c, updatedAt: message.timestamp } : c) })),
    upsertGroup: (group) => setState(prev => ({ ...prev, groups: prev.groups.some(g => g.id === group.id) ? prev.groups.map(g => g.id === group.id ? group : g) : [group, ...prev.groups] }))
  }), [state]);

  return (
    <AppContext.Provider value={value}>
      <Routes>
        <Route path="/login" element={<LoginPage onSignIn={(redirectTo = '/') => { setState(authService.signIn(state)); navigate(redirectTo); }} />} />
        <Route path="/" element={<Protected><Layout /></Protected>}>
          <Route index element={<DashboardPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="contacts/:id" element={<ContactDetailsPage />} />
          <Route path="chats/:chatId" element={<ChatPage />} />
          <Route path="meet" element={<MeetPage />} />
          <Route path="meet/:id" element={<MeetProfilePage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="calls" element={<CallsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/video-call/:personId" element={<Protected><VideoCall /></Protected>} />
      </Routes>
    </AppContext.Provider>
  );
}
