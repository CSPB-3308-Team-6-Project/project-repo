'use client'

import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath={`${process.env.NODE_ENV === 'production' ? (process.env.NEXT_BASE_PATH ?? '') : ''}/api/auth`}>
      <MantineProvider>
        {children}
      </MantineProvider>
    </SessionProvider>
  );
}