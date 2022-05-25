import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SideBar from './SideBar/SideBar';
import Header from './Header/Header';
import { NavList, NavListType } from 'constant/Nav';

type Props = {
  children: React.ReactNode;
};
const mockPermissionLevel = 3;
const SIDE_BAR_WIDTH = 240;

const Layout = ({ children }: Props) => {
  const pathname = useRouter().pathname;
  const theme = useTheme();
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);
  const stateNavs = useMemo<NavListType[]>(() => {
    const transActiveStatusRecursion = (navs) => {
      if (!navs) return;

      return navs
        .filter(nav => mockPermissionLevel >= nav.permissionLevel && !nav.isHidden)
        .map(nav => {
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
      minHeight: '100vh',
      display: 'flex',
      // [theme.breakpoints.up(key)]: {flexDirection: value}
      flexDirection: {
        xs: 'column',
        sm: 'row'
      },
    }}>
      <Header isOpen={isSideBarOpen} handleToggle={handleToggle} breadcrumbs={breadcrumbs} />
      <SideBar isOpen={isSideBarOpen} handleToggle={handleToggle} sideBarNavs={stateNavs} width={SIDE_BAR_WIDTH} />
      <Box
        component='main'
        onClick={isSideBarOpen ? handleToggle : undefined}
        sx={{
          flex: 1,
          mt: `${theme.mixins.toolbar.minHeight as number + 24}px`,
          pb: 5,
          pr: 3,
          ml: 3,
          [theme.breakpoints.up('sm')]: {
            ml: isSideBarOpen ? `calc(${SIDE_BAR_WIDTH}px + 24px)` : `calc(${theme.spacing(8)} + 24px)`
          }
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout;