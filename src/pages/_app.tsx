import React from 'react';
import type { AppProps } from 'next/app';
import Meta from 'component/Meta/Meta';
import AuthProvider from 'component/Auth/Auth';
import Layout from 'component/Layout/Layout';
import global from 'styles/globals.styles';
import reset from 'styles/reset.styles';

type MyAppProps = AppProps

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <React.Fragment>
      <Meta>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* <link
          rel="stylesheet preload" as="font" crossOrigin="anonymous"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        /> */}
        <link
          rel="stylesheet preload" as='style' crossOrigin="anonymous"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {/* <link
          rel="stylesheet preload" as='style' crossOrigin="anonymous"
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined"
        />
        <link
          rel="stylesheet preload" as='style' crossOrigin="anonymous"
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Sharp"
        />
        <link
          rel="stylesheet preload" as='style' crossOrigin="anonymous"
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Round"
        /> */}
      </Meta>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
      <style jsx>{reset}</style>
      <style jsx>{global}</style>
    </React.Fragment>
  )
}

export default MyApp;
