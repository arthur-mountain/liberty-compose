import type { NextPage } from 'next';
import Meta from 'component/Meta/Meta';
import Test from 'container/Test/Test';

type PageProps = NextPage;

const PageComponent: PageProps = () => {
  return <>
    <Meta title='liberty website test page' />
    <Test />
  </>;
}

export default PageComponent;
