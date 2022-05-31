import React from 'react';
import type { NextPage } from 'next'
import Meta from 'component/Meta/Meta';
import Layout from 'component/Layout/Layout';
import Home from 'container/Home/Home';

type PageProps = NextPage & {
  Layout: React.FC<{ children: React.ReactNode }>;
}

const PageComponent: PageProps = () => {
  return (
    <>
      <Meta title='liberty compose' />
      <Home />
    </>
  )
};

PageComponent.Layout = Layout;

export default PageComponent;
