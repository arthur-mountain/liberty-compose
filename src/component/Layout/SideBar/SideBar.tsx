import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SideBarNavItem from './SideBarNavItem';
import { NavListType } from 'constant/Nav';

export const SIDE_BAR_WIDTH = 240;

type Props = {
  isOpen: boolean;
  handleToggle: () => void;
  sideBarNavs: NavListType[];
}

const SideBar = ({ isOpen, handleToggle, sideBarNavs }: Props) => {
  const theme = useTheme();
  const isHorizontal = useMediaQuery(theme.breakpoints.up('sm'));

  const renderSideBarRecursion = (navs,
    { listStyle = {}, addtionalSxProps = {} } = {}
  ) => {
    if (!navs) return;
    const isToggleAble = isHorizontal ? !isOpen : isOpen;

    return <List sx={listStyle}>
      {navs.map(nav => (
        <React.Fragment key={nav.key}>
          <SideBarNavItem
            {...nav}
            isOpen={isOpen}
            onClick={isToggleAble && handleToggle}
            addtionalSxProps={addtionalSxProps}
          />
          {isOpen && renderSideBarRecursion(nav?.subNavs, { listStyle: { px: 0 }, addtionalSxProps: { px: 4 } })}
        </React.Fragment>
      ))}
    </List>
  };

  return (
    <Box sx={{
      width: {
        sm: isOpen ? SIDE_BAR_WIDTH : `calc(${theme.spacing(8)} + 1px)`,
        xs: '100%',
      },
      height: {
        sm: 'auto',
        xs: isOpen ? '100vh' : 0,
      },
      backgroundColor: 'background.default',
      color: 'text.primary',
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      transition: {
        sm: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        xs: theme.transitions.create('height', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      // TODO: index should define; modal or header or sidebar...
      [theme.breakpoints.down('sm')]: {
        position: 'fixed',
        zIndex: 1050
      },
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isOpen ? 'flex-end' : 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be same height app bar
        ...theme.mixins.toolbar,
      }}>
        <IconButton onClick={handleToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      {renderSideBarRecursion(sideBarNavs)}
    </Box >
  )
};

export default SideBar;