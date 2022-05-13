import { useEffect } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';

type PageProps = NextPage;

const Home: PageProps = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/notion')
  }, [])

  return null;
}

export default Home;
