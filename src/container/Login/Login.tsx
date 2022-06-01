import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { lineLogin } from 'services/Login';

const Login = () => {
  const handleLogin = (loginFunc) => {
    return async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const resp = await loginFunc();
        console.log("🚀 ~ Login.tsx ~ line 15 ~ resp", resp)
      } catch (error) {
        console.log("🚀 ~ Login.tsx ~ line 14 ~ error", error)
      }
    }
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'background.default',
    }}>
      {/* TODO: add RWD */}
      <Box
        sx={{
          width: '350px',
          height: '300px',
          border: '1px solid #666',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}
      >
        <Typography
          component='h1'
          variant='h1'
          sx={{ fontSize: 32, height: 'auto' }}
        >
          Login
        </Typography>
        <TextField label="username" variant="standard" />
        <TextField label="password" variant="standard" />
        <Box sx={{ width: '60%' }}>
          <Button
            variant="contained"
            sx={{ width: '48%', mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ width: '48%', }}
          >
            Login
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <IconButton
            sx={{ width: '50px', height: '50px' }}
            onClick={handleLogin(lineLogin)}
          >
            <img src='social-icons/line.svg' />
          </IconButton>
          <IconButton
            sx={{ width: '50px', height: '50px' }}
            onClick={() => { }}
          >
            <img src='social-icons/facebook.svg' />
          </IconButton>
          <IconButton
            sx={{ width: '50px', height: '50px' }}
            onClick={() => { }}
          >
            <img src='social-icons/twitter.svg' />
          </IconButton>
        </Box>
      </Box>
    </Box >
  )
}

export default Login