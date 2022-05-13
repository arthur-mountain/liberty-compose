import React from 'react';
import Link from 'next/link';
import { SxProps, Theme } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

type Props = {
  title: string;
  href: string;
  iconName: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
  addtionalSxProps?: SxProps<Theme>;
};

const SideBarNavItem = ({
  title,
  href,
  iconName,
  isOpen,
  isActive,
  onClick,
  addtionalSxProps = {},
}: Props) => {
  const color = isActive ? 'primary.main' : 'common.white';

  return (
    <ListItem
      sx={{
        background: ({ palette }) => isActive ? palette.action.selected : 'background.default',
        ":hover": { background: ({ palette }) => palette.action.selected },
        ...addtionalSxProps
      }}
    >
      <Link href={href}>
        <MuiLink
          underline='none'
          sx={{
            display: 'flex',
            alignItem: 'center',
            flex: 1,
            pl: 0.5
          }}
          onClick={onClick}
        >
          <Icon
            sx={[{ color, mr: 0 }, isOpen && { mr: 1 },]}>
            {iconName}
          </Icon>
          <Typography sx={{
            opacity: isOpen ? 1 : 0,
            position: isOpen ? 'relative' : 'absolute',
            color
          }}>
            {title}
          </Typography>
        </MuiLink>
      </Link>
    </ListItem>
  )
};

export default SideBarNavItem