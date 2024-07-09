import React, { useEffect, useState } from 'react';
import { AuthContext, IAuthProvider } from './interfaces';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const AuthConfigProvider: IAuthProvider = function AuthConfigProvider({
  children,
}) {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userData => {
      setUser(userData);
      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber;
  }, [initializing]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {initializing ? null : children}
    </AuthContext.Provider>
  );
};
