'use client'

import { colors } from "@/lib/color-scheme";
import { href } from "@/lib/url-helper";
import { Button } from "@mantine/core"
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NavButtons({ setLoading, navigate, width }: { setLoading: (loading: boolean) => void, navigate: (url: string) => void, width: number }) {

    const { data: session } = useSession();
    const user = session?.user || null;
    const pathname = usePathname();
    const router = useRouter();
    const buttonWidth = width && width > 768 ? 'auto' : '60%';

    const signOutAttempt = async () => {
        //confirm with the user they want to signout or not.
        // if they do, use this:
        //
        // taken care of by Carl 4/1

        const homeUrl = href('/');

        if (!user) {
            signOut({ redirect: false });
            router.push(homeUrl);
            setLoading(false);
            return;
        }

        const confirm = window.confirm('Are you sure you want to log out?');
        setLoading(true);
        if (!confirm) {
            toast.error('Logout cancelled');
            setLoading(false);
            return;
        }

        try {

            const userEmail = user.email || '';

            if (!userEmail) {
                toast.error('No user email found, redirecting to home page');
                await signOut({ redirect: false });
                router.push(homeUrl);
                return;
            }

            const signOutResult = await signOut({ redirect: false });

            if (!signOutResult) {
                toast.error('Error signing out, please try again');
                setLoading(false);
                return;
            }

            toast.success('Signed out successfully, redirecting to home page...');
            router.replace(homeUrl);

        } catch (e) {

            console.log('Error signing out: ', e);
            setLoading(false);
            return;

        }
    }

    return (
        <>

            {user && <Button onClick={() => navigate('/tracking')} className="cursor-pointer" variant="light" disabled={pathname === '/tracking'} w={buttonWidth} styles={{
                root: {
                    backgroundColor: colors.navLinkHover,
                    color: colors.textPrimary,
                },
            }}>
                Tracking
            </Button>}

            {/* NEW TRACKING STRUCTURE */}

            {user ? (
                <Button onClick={() => navigate('/reports')} className="cursor-pointer" variant="light" disabled={pathname === '/reports'} w={buttonWidth} styles={{
                    root: {
                        backgroundColor: colors.navLinkHover,
                        color: colors.textPrimary,
                    },
                }}>
                    Reports
                </Button>
            ) : (
                <Button onClick={() => navigate('/login')} className="cursor-pointer" variant="light" disabled={pathname === '/login'} w={buttonWidth} styles={{
                    root: {
                        backgroundColor: colors.buttonLogin,
                        color: colors.textPrimary,
                    },
                }}>
                    Login
                </Button>
            )}

            {user ? (
                <Button onClick={() => navigate('/profile')} className="cursor-pointer" variant="light" disabled={pathname === '/profile'} w={buttonWidth} styles={{
                    root: {
                        backgroundColor: colors.statNeutral,
                        color: colors.reportSection,
                    },
                }}>
                    Profile
                </Button>

            ) : (
                <Button onClick={() => navigate('/register')} className="cursor-pointer" disabled={pathname === '/register'} w={buttonWidth} styles={{
                    root: {
                        backgroundColor: colors.buttonRegister,
                        color: colors.textPrimary,
                    },
                }}>
                    Register
                </Button>
            )}

            {user &&
                <Button onClick={signOutAttempt} color="red" className="cursor-pointer" w={buttonWidth} styles={{
                    root: {
                        backgroundColor: colors.textDanger,
                        color: colors.textPrimary,
                    },
                }}>
                    Logout
                </Button>
            }

        </>
    )
}