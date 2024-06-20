import React, { useCallback, useEffect, useState } from 'react';
import { AuthContext, IAuthProvider } from './interfaces';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const AuthConfigProvider: IAuthProvider = function AuthConfigProvider({
  children,
}) {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = useCallback(
    (userData: any) => {
      setUser(userData);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

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
