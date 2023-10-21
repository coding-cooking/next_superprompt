import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import { ProviderProps } from '@/components/Provider'

export const metadata = {
    title: "SuperPrompt",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children, session }: ProviderProps) => {
  return (
    <html lang="en">
        <body>
            <Provider session={session}>
                  <div className="main">
                      <div className="gradient" />
                  </div>
                  <main className="app">
                      <Nav />
                      { children }
                  </main>
            </Provider>
            
        </body>

    </html>
  )
}

export default RootLayout;
