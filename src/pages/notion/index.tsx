import type { NextPage } from 'next';
import Notion from 'container/Notion/Notion';
import Meta from 'component/Meta/Meta';

type PageProps = NextPage;

const PageComponent: PageProps = () => {
  return <>
    <Meta title='my frontend code notion preview' />
    <Notion />
  </>;
}

export default PageComponent;
