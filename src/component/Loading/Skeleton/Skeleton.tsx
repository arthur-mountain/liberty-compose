import React from 'react';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

const Index = ({ children, sx, ...props }: SkeletonProps) => {
  const size = children ? {} : { width: "100%", height: "100%", }

  return (
    <Skeleton
      animation='wave'
      sx={{
        transform: 'scale(1)',
        background: ({ palette }) => `${palette.grey['900']}`,
        ...sx
      }}
      {...size}
      {...props}
    >
      {children}
    </Skeleton >
  )
}

export default Index;