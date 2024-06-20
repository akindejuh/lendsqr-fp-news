import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from 'react';

export type IAuthProvider = React.FC<{
  children: ReactNode;
}>;

export type IAuthContext = {
  user: FirebaseAuthTypes.User | null;
  setUser: Dispatch<SetStateAction<FirebaseAuthTypes.User | null>>;
};

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  useEffect(function onDidMount() {
    if (!context) {
      console.error('useAuth must have AuthProvider as parent or ancestor.');
    }
  });

  return context;
}
