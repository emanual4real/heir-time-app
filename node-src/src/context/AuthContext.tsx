import { Dispatch, ReactElement, SetStateAction, createContext, useState } from 'react';

export interface AuthState {
  loggedIn: boolean;
  user: object;
}

export interface AuthContext {
  auth: object;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}

export interface AuthProviderProps {
  children: ReactElement;
}

export const AuthContext = createContext<AuthContext>(undefined!);

export const AuthProvider = (props: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>({ loggedIn: false, user: {} });

  const value: AuthContext = { auth, setAuth };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
