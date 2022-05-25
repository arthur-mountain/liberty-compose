import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Test = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default', px: 5, py: 1, mt: 2 }}>
      <Typography component='h1' sx={{ my: 3, height: 'auto', color: 'text.primary' }}>
        Preview
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, }}>
        <Box sx={{ flexBasis: '30%' }}>
          <Typography component='h5' sx={{ height: 'auto', color: 'text.primary', textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
            按鈕
          </Typography>
          <Button variant="contained" sx={{ width: '100%', mb: 2 }}>我是按鈕</Button>
          <Button variant="outlined" sx={{ width: '100%', mb: 2 }}>我是按鈕</Button>
          <Button variant="text" sx={{ width: '100%', mb: 2 }}>我是按鈕</Button>
        </Box>
        <Box sx={{ flexBasis: '30%' }}>
          <Typography component='h5' sx={{ height: 'auto', color: 'text.primary', textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
            輸入框
          </Typography>
          <TextField
            type="text"
            variant="filled"
            placeholder="測試輸入框"
            sx={{ mb: 3 }}
          />
          <TextField
            type="textArea"
            variant="outlined"
            color="secondary"
            multiline
            placeholder="測試多行輸入框"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '30%' }}>
          <Typography component='h5' sx={{ height: 'auto', color: 'text.primary', textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
            文字
          </Typography>
          <Typography component='h1' sx={{ display: 'block', height: '100%' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatum unde tempora eveniet corrupti illo molestiae iste, sed reiciendis provident reprehenderit vero? Optio harum minus blanditiis quia officiis debitis ipsam.
          </Typography>
          <Typography component='p' sx={{ display: 'block', height: '100%' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatum unde tempora eveniet corrupti illo molestiae iste, sed reiciendis provident reprehenderit vero? Optio harum minus blanditiis quia officiis debitis ipsam.
          </Typography>
          <Typography component='span' sx={{ display: 'block', height: '100%' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatum unde tempora eveniet corrupti illo molestiae iste, sed reiciendis provident reprehenderit vero? Optio harum minus blanditiis quia officiis debitis ipsam.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Test