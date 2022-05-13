import React from 'react';
import type { AppProps } from 'next/app'
import Meta from 'component/Meta/Meta';
import global from 'styles/globals.styles';
import reset from 'styles/reset.styles';

type MyAppProps = AppProps

function MyApp({ Component, pageProps }: MyAppProps) {
  return <React.Fragment>
    <Meta>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link
        rel="stylesheet preload" as="font" crossOrigin="anonymous"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Meta>
    <main>
      <Component {...pageProps} />
    </main>
    <style jsx>{reset}</style>
    <style jsx>{global}</style>
  </React.Fragment>
}

export default MyApp
