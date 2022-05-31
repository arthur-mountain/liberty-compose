import type { NextPage } from 'next';
import Meta from 'component/Meta/Meta';
import Layout from 'component/Layout/Layout';
import Notion from 'container/Notion/Notion';

type PageProps = NextPage & {
  Layout: React.FC<{ children: React.ReactNode }>;
}

const PageComponent: PageProps = () => {
  return <>
    <Meta title='my frontend code notion preview' />
    <Notion />
  </>;
}

PageComponent.Layout = Layout;

export default PageComponent;
