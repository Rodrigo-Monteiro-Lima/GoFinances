import React, { ReactNode, createContext, useMemo, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const {params: {access_token}, type} = await AuthSession.startAsync({ authUrl: GOOGLE_AUTH_URL }) as AuthorizationResponse;
      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);
        const userInfo = await response.json();
        console.log(userInfo)
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
      }
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  }

  const value = useMemo(() => ({
    user,
    signInWithGoogle,
  }), [user]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;