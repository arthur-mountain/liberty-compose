import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth, { AuthCtx } from 'hooks/useAuth';

type Props = {
  children: React.ReactNode;
}

// const palette = {
//   light: {
//     primary: {
//       main: '#03a9f4',
//       light: '#67daff',
//       dark: '#007ac1',
//     },
//     secondary: {
//       main: '#455a64',
//       light: '#718792',
//       dark: '#1c313a',
//     },
//     text: {
//       parimary: '#ffffff',
//       secondary: '#eeeeee'
//     }
//   }
// }
const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  mixins: { toolbar: { minHeight: 64 } }
});

// For features can be add login or some state for all of component. 
/**
 *  TODO:
 *    1. Add a page that adjust theme by user.
 *    2. Mui palette should adjust to custom color.
 */
const Auth = ({ children }: Props) => {
  const [store, action] = useAuth();
  const { customTheme } = store;

  return (
    <ThemeProvider theme={customTheme || theme}>
      <AuthCtx.Provider value={{ store, action }}>
        {children}
      </AuthCtx.Provider>
    </ThemeProvider>
  )
}

export default Auth;