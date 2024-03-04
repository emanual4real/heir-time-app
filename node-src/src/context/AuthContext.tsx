import { ReactElement, createContext, useState } from 'react';

export interface AuthState {
  loggedIn: boolean;
  user: object | null;
}

export interface AuthContext {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

export interface AuthProviderProps {
  children: ReactElement;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [auth, setAuth] = useState<AuthState>({ loggedIn: false, user: null });

  const value = { auth, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
