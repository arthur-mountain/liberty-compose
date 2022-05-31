import React from 'react';
import type { NextPage } from 'next'
import type { AppProps } from 'next/app';
import Meta from 'component/Meta/Meta';
import Auth from 'component/Auth/Auth';
import global from 'styles/globals.styles';
import reset from 'styles/reset.styles';

type PageProps = NextPage & {
  Layout: React.FC<{ children: React.ReactNode }>;
}

type MyAppProps = AppProps & { Component: PageProps };

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout && Component.Layout;

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
      <Auth>
        {Layout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <main>
            <Component {...pageProps} />
          </main>
        )}
      </Auth>
      <style jsx>{reset}</style>
      <style jsx>{global}</style>
    </React.Fragment>
  )
}

export default MyApp;
