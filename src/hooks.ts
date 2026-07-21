import React from 'react';
import { AppContext } from './App';

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppContext.');
  return ctx;
}
