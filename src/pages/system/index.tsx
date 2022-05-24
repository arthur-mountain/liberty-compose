import type { NextPage } from 'next';
import Meta from 'component/Meta/Meta';
import System from 'container/System/System';

type PageProps = NextPage;

const PageComponent: PageProps = () => {
  return <>
    <Meta title='liberty website system setiings' />
    <System />
  </>;
}

export default PageComponent;
