import React from 'react';
import Link from 'next/link';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import MuiLink from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Icon from '@mui/material/Icon';
import type { NavListType } from 'constant/Nav';
import { SIDE_BAR_WIDTH } from '../SideBar/SideBar';
interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}

type Props = {
  isOpen: boolean;
  handleToggle: () => void;
  breadcrumbs: NavListType[];
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>(({ theme, open }) => {
  const appBarStyles = open ? {
    [theme.breakpoints.up('sm')]: {
      marginLeft: SIDE_BAR_WIDTH,
      width: `calc(100% - ${SIDE_BAR_WIDTH}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  } : {};

  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...appBarStyles,
  }
});

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  ...theme.mixins.toolbar
}));

const Header = ({ isOpen, handleToggle, breadcrumbs }: Props) => {
  const theme = useTheme();
  const isHorizontal = useMediaQuery(theme.breakpoints.up('sm'));
  const isMenuIconHide = isHorizontal && isOpen ? {
    opacity: 0, pointerEvents: 'none', position: 'absolute', zIndex: -1,
  } : {};

  return (
    <AppBar position="fixed" open={isOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open sidebar"
          onClick={handleToggle}
          edge="start"
          sx={{ mr: 2, ...isMenuIconHide }}
        >
          {!isHorizontal && isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Breadcrumbs
          aria-label="breadcrumbs"
          maxItems={5}
          itemsBeforeCollapse={3}
          separator={<ChevronRightIcon />}
        >
          {breadcrumbs.map(nav => (
            <Link key={nav.key} href={nav.href} passHref>
              <MuiLink
                underline='hover'
                color={nav.isActive ? "primary.main" : 'common.white'}
                sx={{ display: 'flex', alignItem: 'center' }}
              >
                <Icon sx={{ mr: 1 }}>{nav.iconName}</Icon>
                {nav.title}
              </MuiLink>
            </Link>
          ))}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  )
};

export default Header;