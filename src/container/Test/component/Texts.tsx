import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// type use temp any 
type Props = {
  texts: { type: any, color?: string }[];
}

const Texts = ({ texts }: Props) => {
  return (
    <>
      {texts.map(({ type, color }, index) => {
        if (type === 'blank') {
          return (
            <Divider key={`${type}-${index}`} sx={{ width: '100%', color: '#fff', my: 3 }}>
              --------------------------------
            </Divider>
          )
        }

        return (
          <Box key={color} sx={{ color, textAlign: 'center' }}>
            <Box sx={{ mb: 2 }}>
              <b style={{ borderBottom: `1px solid #fff`}}>
                {color}
              </b>
            </Box>
            <Typography component={type} sx={{ mb: 2 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatum unde tempora eveniet corrupti illo molestiae iste, sed reiciendis provident reprehenderit vero? Optio harum minus blanditiis quia officiis debitis ipsam.
            </Typography>
          </Box>
        )
      })}
    </>
  )
}

export default Texts