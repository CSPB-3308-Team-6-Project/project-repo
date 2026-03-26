//Conner/Carl page

'use client'

import Link from "next/link"
import { href } from "@/lib/url-helper"

import { AppShell, Group, Button, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CheckUser } from "@/utils/server-actions/check-user";

export default function NavWrapper({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState(false);
  const { data: session } = useSession();

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

  console.log(session ? session : 'no sesh');

  return (

    <AppShell header={{ height: 60 }} padding="md">

      <AppShell.Header style={{ borderBottom: "3px solid #eaeaea" }}>

        <Group justify="space-between" px="md" h="100%">

          <Title order={3}>Health Tracker</Title>

          <Group>

            <Button component={Link} href={href('/')}>
              Home
            </Button>


            {user && <Button component={Link} href={href('/reports')} variant="light">
              Reports
            </Button>}

            {/* NEW TRACKING STRUCTURE */}

            {user ? (
              <Button component={Link} href={href('/tracking')}>
                Tracking
              </Button>
            ) : (
              <Button component={Link} href={href('/login')}>
                Login
              </Button>
            )}

            {user ? (
              <Button component={Link} href={href('/profile')} variant="light">
                Profile
              </Button>

            ) : (
              <Button component={Link} href={href('/register')} color="green">
                Register
              </Button>
            )}

            {user &&
              <button onClick={() => console.log('clicked log out')}>
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

  )
}