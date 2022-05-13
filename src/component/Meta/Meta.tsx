import React from 'react';
import Head from 'next/head'

type Props = {
  title?: string;
  children?: React.ReactNode;
}

const Meta = ({ title, children }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      {children}
    </Head>
  )
}

export default Meta