import { createContext, useContext } from 'react';
import { supabase } from '../../initSupabase';

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => (
  <SupabaseContext.Provider value={supabase}>
    {children}
  </SupabaseContext.Provider>
);

export const useSupabase = () => useContext(SupabaseContext);