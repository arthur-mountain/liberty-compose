import type { NextPage } from 'next';
import Meta from 'component/Meta/Meta';
import Layout from 'component/Layout/Layout';
import System from 'container/System/System';

type PageProps = NextPage & {
  Layout: React.FC<{ children: React.ReactNode }>;
}

const PageComponent: PageProps = () => {
  return <>
    <Meta title='liberty website system setiings' />
    <System />
  </>;
}

PageComponent.Layout = Layout;

export default PageComponent;
