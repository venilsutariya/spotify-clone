import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import Sidebar from '@/components/Sidebar';
import SupbaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Fell the music',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupbaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupbaseProvider>
      </body>
    </html>
  )
}
