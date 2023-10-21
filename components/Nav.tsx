"use client" 

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers/index"


const Nav = ( ) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<null | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    //getProviders() returns the list of providers currently configured for sign in
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center"> 
        <Image 
        src="/assets/images/logo.svg"
        alt="SuperPrompt Logo"
        width={30}
        height={30}
        className="object-contain"
        />
        <p className="logo_text">SuperPrompt</p>
      </Link>

      {/* {desktop navigation} */}
      <div className="sm:flex hidden">
        {session?.user?.image? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={(event: React.MouseEvent<HTMLButtonElement>) => signOut()} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image 
                src={ session?.user.image }
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
              </Link>
          </div>
        ) : <>
            {
              providers && Object.values(providers).map((provider) => (
                <button 
                type="button" 
                key={provider.name} 
                onClick={() => signIn(provider.id)}
                className="black_btn">
                  Sign In
                </button>
              ))
            }
        </>}
      </div>
      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user?.image? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={ 37 }
              height={ 37 }
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {
              toggleDropdown && (
                <div className="dropdown">
                  <Link 
                    href="/profile" 
                    className="dropdpwn_link"
                    onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdpwn_link"
                    onClick={ () => setToggleDropdown(false) }
                  >
                    Create Prompt
                  </Link>
                  <button 
                  type="button"
                  onClick={() => { 
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                  >Sign Out
                  </button>

                </div>
              )
            }

          </div>
        ) : <>
            {
              providers && Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={ provider.name }
                  onClick={ () => signIn(provider.id) }
                  className="black_btn">
                  Sign In
                </button>
              ))
            }
        
        </>}

      </div>

    </nav>
  )
}

export default Nav
