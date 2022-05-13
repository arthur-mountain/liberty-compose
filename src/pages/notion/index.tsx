import type { NextPage } from 'next';
import Meta from 'component/Meta/Meta';
import Notion from 'container/Notion/Notion';

type PageProps = NextPage;

const PageComponent: PageProps = () => {
  return <>
    <Meta title='my frontend code notion preview' />
    <Notion />
  </>;
}

export default PageComponent;
