'use client'

import { Menu } from "@mantine/core"
import NavButtons from "./nav-buttons"
import { colors } from "@/lib/color-scheme"
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavMenu({ opened, close, setLoading, navigate, width, open }: { opened: boolean, close: () => void, setLoading: (loading: boolean) => void, navigate: (url: string) => void, width: number, open: () => void }) {

    const menuSize = width && width < 400 ? '95%' : '50%';
    return (
        <Menu
            opened={opened}
            onClose={close}
            width={menuSize}
            
        >
            <Menu.Target>
                <GiHamburgerMenu
                    onClick={open}
                    size={24}
                    className="cursor-pointer"
                    style={{ color: colors.navLink }}
                />
            </Menu.Target>
            <Menu.Dropdown className="flex flex-col items-center justify-center h-content space-y-4" styles={{
                dropdown: { backgroundColor: colors.nav, borderColor: colors.divider }
            }} w={menuSize} h={'auto'} pb={32} mt={0}>
                <Menu.Label className="text-center" style={{ color: colors.textPrimary, fontSize: '1rem' }} mt={0}>
                    Menu
                </Menu.Label>
                <NavButtons setLoading={setLoading} navigate={navigate} width={width} />
            </Menu.Dropdown>
        </Menu>
    )
}