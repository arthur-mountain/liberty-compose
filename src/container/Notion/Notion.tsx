import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { getPageBlocks } from 'services/Notion';
import Categories from './Categories/Categories';

// TODO: shpuld use axios interator for error(422 default can't be catch);
// TODO: isInit, isLoading status;
// TODO: services axios intance should filter some information;
// TODO: variables should rename;
const Notion = () => {
  const [categories, setCategories] = useState<Notion.Categories[]>([]);
  const [stateSubNavList, setStateSubNavList] = useState<Notion.SubNavList | null>(null);

  const handleClick = async (e, pageId) => {
    e.preventDefault();

    try {
      const resp = await getPageBlocks({ pageId, perPage: 20 });

      if (resp.data.tatusCode === 200) {
        setStateSubNavList(resp.data.data)
      } else {
        throw new Error(resp.data.tatusCode);
      };
    } catch (error) {
      console.log('Get page blocks error: ', error.response.data.message);
    }
  };

  useEffect(() => {
    fetch('/api/notion')
      .then(res => res.json())
      .then(categories => {
        if (categories?.statusCode === 200) {
          setCategories(categories.data)
          return
        }

        throw new Error(categories.message);
      })
      .catch(error => console.log('my error: ', error.message));
  }, [])

  return (
    <>
      Notion<br />
      <Categories categories={categories} handleClick={handleClick} />
      <hr></hr>
      {stateSubNavList?.data?.map(subNav => (
        <div key={subNav.id}>
          {/* TODO: type Condition, like toggle without child_page.title */}
          {subNav?.child_page?.title}
        </div>
      ))}
    </>
  )
}

export default Notion;