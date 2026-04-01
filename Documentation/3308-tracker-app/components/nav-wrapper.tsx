//Conner/Carl page

'use client'

import { href } from "@/lib/url-helper"
import { AppShell, Group, Button, Title, Box, LoadingOverlay } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { CheckUser } from "@/utils/server-actions/check-user";
import { usePathname, useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";

export default function NavWrapper({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, { open, close }] = useDisclosure(false); // use open/close instead of toggle
  const navigatingTo = useRef<string | null>(null);

  // When the pathname actually changes, hide the overlay
  useEffect(() => {
    if (navigatingTo.current !== null) {
      close();
      navigatingTo.current = null;
    }
  }, [pathname]);

  const navigate = (url: string) => {
    const urlToGo = href(url);
    navigatingTo.current = urlToGo;
    open();
    router.push(urlToGo);
  }

  const checkingUser = async (email: string) => {
    const userChecked = await CheckUser(email);
    if (userChecked) {
      setUser(true)
    } else {
      setUser(false)
    }
  }

  useEffect(() => {
    if (session && session.user && session.user.email) {
      checkingUser(session.user.email)
    } else {
      setUser(false)
    }
  }, [session]);

  // console.log(session ? session : 'no sesh');

  const signOutAttempt = async () => {
    //confirm with the user they want to signout or not.
    // if they do, use this:
    //
    // taken care of by Carl 4/1

    open()

    if (!user) {
      router.replace(href('/'))
      close()
      return;
    }

    const confirm = window.confirm('Are you sure you want to log out?');

    if (!confirm) {
      close()
      return;
    }

    const signingOut = await signOut();

    if (signingOut) {
      router.replace(href('/'))
      close()
      return;
    }


  }

  return (
    <Box pos="relative">
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      {/* ...other content */}

      <AppShell header={{ height: 60 }} padding="md">

        <AppShell.Header style={{ borderBottom: "3px solid #eaeaea" }}>

          <Group justify="space-between" px="md" h="100%">

            <Title order={3}>Health Tracker</Title>

            <Group>

              <Button onClick={() => navigate('/')} className="cursor-pointer">
                Home
              </Button>


              {user && <Button onClick={() => navigate('/reports')} className="cursor-pointer" variant="light">
                Reports
              </Button>}

              {/* NEW TRACKING STRUCTURE */}

              {user ? (
                <Button onClick={() => navigate('/tracking')} className="cursor-pointer" variant="light">
                  Tracking
                </Button>
              ) : (
                <Button onClick={() => navigate('/login')} className="cursor-pointer" variant="light">
                  Login
                </Button>
              )}

              {user ? (
                <Button onClick={() => navigate('/profile')} className="cursor-pointer" variant="light">
                  Profile
                </Button>

              ) : (
                <Button onClick={() => navigate('/register')} className="cursor-pointer" color="green">
                  Register
                </Button>
              )}

              {user &&
                <button onClick={signOutAttempt}>
                  Logout
                </button>
              }

            </Group>

          </Group>

        </AppShell.Header>

        <AppShell.Main>
          {children}
        </AppShell.Main>

      </AppShell>
    </Box>
  )
}