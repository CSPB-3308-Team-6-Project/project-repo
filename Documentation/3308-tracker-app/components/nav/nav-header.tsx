//Conner/Carl page

'use client'


import NavButtons from "./nav-buttons";
import { Group } from "@mantine/core";
import { colors } from "@/lib/color-scheme";
import { useState } from "react";
import NavMenu from "./nav-menu";

export default function NavHeader({ width, setLoading, navigate, pathname, opened, close, open }: { width: number, setLoading: (loading: boolean) => void, navigate: (url: string) => void, pathname: string, opened: boolean, close: () => void, open: () => void }) {

  const [isHovering, setIsHovering] = useState(false);

  const homeButtonClasses = pathname !== '/' ? 'text-xl font-bold hover:underline' : 'text-xl font-bold';

  const getTextColor = () => {
    if (pathname === '/') return colors.navLink;
    if (isHovering) return colors.navLinkHover; // Using teal accent on hover
    return colors.navLinkActive;
  };

  return (
    <Group justify="space-between" px="md" h="100%">

      <button
        onClick={() => navigate('/')}
        className="cursor-pointer"
        disabled={pathname === '/'}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <p
          className={homeButtonClasses}
          style={{
            color: getTextColor()
          }}
        >
          Tracker App
        </p>
      </button>

      <Group>
        {width && width > 768 ? (
          <NavButtons setLoading={setLoading} navigate={navigate} width={width} />
        ) : (
          <NavMenu opened={opened} close={close} open={open} setLoading={setLoading} navigate={navigate} width={width} />
        )}
      </Group>
    </Group>
  )
}