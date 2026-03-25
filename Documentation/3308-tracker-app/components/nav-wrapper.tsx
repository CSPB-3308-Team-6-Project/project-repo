'use client'

import Link from "next/link"
import { href } from "@/lib/url-helper"

import { AppShell, Group, Button, Title } from "@mantine/core"

export default function NavWrapper({ children }: { children: React.ReactNode }) {

  return (

    <AppShell header={{ height: 60 }} padding="md">

      <AppShell.Header style={{ borderBottom: "3px solid #eaeaea" }}>

        <Group justify="space-between" px="md" h="100%">

          <Title order={3}>Health Tracker</Title>

          <Group>

            <Button component={Link} href={href('/')}>
              Home
            </Button>

            <Button component={Link} href={href('/profile')} variant="light">
              Profile
            </Button>

            <Button component={Link} href={href('/reports')} variant="light">
              Reports
            </Button>

            {/* NEW TRACKING STRUCTURE */}

            <Button component={Link} href={href('/tracking')}>
              Tracking
            </Button>

            <Button component={Link} href={href('/register')} color="green">
              Register
            </Button>

          </Group>

        </Group>

      </AppShell.Header>

      <AppShell.Main>
        {children}
      </AppShell.Main>

    </AppShell>

  )
}