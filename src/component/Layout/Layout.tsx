import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SideBar from './SideBar/SideBar';
import Header from './Header/Header';
import { NavList, NavListType } from 'constant/Nav';

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = useRouter().pathname;
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);
  const stateNavs = useMemo<NavListType[]>(() => {
    const transActiveStatusRecursion = (navs) => {
      if (!navs) return;

      return navs.map(nav => {
        const subNavs = transActiveStatusRecursion(nav?.subNavs);
        const currentNav = { ...nav, isActive: nav.href === pathname };

        return subNavs ? { ...currentNav, subNavs } : currentNav;
      })
    };

    return transActiveStatusRecursion(NavList);
  }, [pathname]);
  const breadcrumbs = useMemo<NavListType[]>(() => {
    // Translate the navs to one-dimensional of breadcrumb array.
    const transSimpleArrayRecursion = (navs) => {
      if (!navs) return [];

      return navs.reduce((acc, curr) => {
        if (pathname.includes(curr.href)) {
          return [...acc, curr, ...transSimpleArrayRecursion(curr?.subNavs)]
        };

        return [];
      }, [])
    };

    const navs = pathname === '/' ? [stateNavs[0]] : stateNavs.slice(1);

    return transSimpleArrayRecursion(navs);
  }, [stateNavs]);

  return (
    <Box sx={{
      display: 'flex',
      // [theme.breakpoints.up(key)]: {flexDirection: value}
      flexDirection: {
        xs: 'column',
        sm: 'row'
      }
    }}>
      <Header isOpen={isSideBarOpen} handleToggle={handleToggle} breadcrumbs={breadcrumbs} />
      <SideBar isOpen={isSideBarOpen} handleToggle={handleToggle} sideBarNavs={stateNavs} />
      <Container
        component='main'
        onClick={isSideBarOpen ? handleToggle : undefined}
        sx={{ flex: 1, mt: ({ mixins }) => (`${mixins.toolbar.minHeight as number + 24}px`) }}
      >
        {children}
      </Container>
    </Box>
  )
}

export default Layout;