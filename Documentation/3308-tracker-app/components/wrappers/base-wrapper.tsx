'use client'

import NavHeader from "../nav/nav-header"
import { AppShell, LoadingOverlay } from "@mantine/core"
import { useLoading } from "../providers/loading-provider"
import React, { useEffect } from "react";
import { useWindowSizes } from "@/context/window-sizes";
import { href } from "@/lib/url-helper";
import { usePathname, useRouter } from "next/navigation";
import { colors } from "@/lib/color-scheme";
import { useDisclosure } from "@mantine/hooks";

const routes = [
    { label: 'Home', url: '/' },
    { label: 'Reports', url: '/reports' },
    { label: 'Tracking', url: '/tracking' },
    { label: 'Profile', url: '/profile' },
    { label: 'Login', url: '/login' },
    { label: 'Register', url: '/register' }
];

export default function BaseWrapper({ children }: { children: React.ReactNode }) {

    const [opened, { open, close }] = useDisclosure(false);
    const { loading, setLoading } = useLoading();
    const { width } = useWindowSizes();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {

        // Validate route
        if (pathname && !routes.find(route => route.url === pathname)) {
            console.log('Invalid route, redirecting to home page', pathname);
            router.replace(href('/'));
        }
        setLoading(false);

    }, [pathname, router, setLoading]);

    const navigate = (url: string) => {
        setLoading(true);
        close();
        const urlToGo = href(url);
        router.push(urlToGo);
    }

    return (
        <>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
                opacity={0.8}
                bg={'white'}
                transitionProps={{ duration: 0 }}
            />
            <AppShell header={{ height: 60 }} padding="md" style={{ backgroundColor: colors.background }} bg={colors.background}>
                <AppShell.Header style={{ borderBottom: `1px solid ${colors.divider}`, backgroundColor: colors.nav }}>
                    <NavHeader width={width} setLoading={setLoading} navigate={navigate} pathname={pathname} opened={opened} close={close} open={open} />
                </AppShell.Header>
                <AppShell.Main h={'calc(100dvh - 60px)'} style={{ backgroundColor: colors.background, overflow: 'hidden' }}>
                    {children}
                </AppShell.Main>
            </AppShell>
        </>
    )
}