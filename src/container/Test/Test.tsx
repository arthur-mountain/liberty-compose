import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Test = () => {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexBasis: '30%' }}>
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
        <Button variant="text">test</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '30%' }}>
        <TextField
          type="textArea"
          variant="outlined"
          color="secondary"
          sx={{ border: '1px solid #000', height: 300 }}
        />
        <TextField
          type="text"
          variant="filled"
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '30%' }}>
        <Typography component='h1' sx={{ background: '' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatum unde tempora eveniet corrupti illo molestiae iste, sed reiciendis provident reprehenderit vero? Optio harum minus blanditiis quia officiis debitis ipsam.
        </Typography>
        <Typography component='p'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatum unde tempora eveniet corrupti illo molestiae iste, sed reiciendis provident reprehenderit vero? Optio harum minus blanditiis quia officiis debitis ipsam.
        </Typography>
        <Typography component='span'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatum unde tempora eveniet corrupti illo molestiae iste, sed reiciendis provident reprehenderit vero? Optio harum minus blanditiis quia officiis debitis ipsam.
        </Typography>
      </Box>
    </Box>
  )
}

export default Test