import React from 'react';
import type { NextPage } from 'next'
import Meta from 'component/Meta/Meta';
import Home from 'container/Home/Home';

type PageProps = NextPage;

const PageComponent: PageProps = () => {
  return (
    <>
      <Meta title='liberty compose' />
      <Home />
    </>
  )
};

export default PageComponent;
