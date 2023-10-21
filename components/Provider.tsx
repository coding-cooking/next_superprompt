"use client"

import { SessionProvider } from "next-auth/react"

export type ProviderProps = {
  children: React.ReactNode;
  session: {
    user: {
      username: string;
      email: string;
      image: string;
      id: string;
    };
    expires: string; 
  };
};


const Provider = ({children, session}: ProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
