import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { getPageBlocks } from 'services/Notion';
import Select from './Select/Select';

// TODO: shpuld use axios interator for error(422 default can't be catch);
// TODO: isInit, isLoading status;
// TODO: services axios intance should filter some information;
// TODO: variables should rename;
// TODO: add preview, depends on notion data type;
//   current known type has: child_page, toggle, code, photography
const Notion = () => {
  const [notionPages, setNotionPages] = useState<Notion.NotionPages[]>([]);

  const appendChildrenPage = (pages, pageId, data) => {
    return pages.map(page => {
      const id = page?.pageId || page?.id;
      if (id === pageId) return { ...page, children: data };

      if (page?.children) {
        return {
          ...page,
          children: {
            ...page.children,
            data: appendChildrenPage(page.children.data, pageId, data)
          }
        }
      };

      return page
    });
  }

  const handleClick = async (e, page) => {
    if (page.has_children && !page.has_children) return;
    e.preventDefault();

    try {
      const pageId = page?.pageId || page?.id;
      const resp = await getPageBlocks({ pageId, perPage: 20 });
      const data = resp.data.data;

      if (resp.data.statusCode === 200) {
        setNotionPages(prevPages => {
          return appendChildrenPage(prevPages, pageId, data);
        });
      } else {
        throw new Error(resp.data.tatusCode);
      };
    } catch (error) {
      console.log('Get page blocks error: ', error);
    }
  };

  useEffect(() => {
    fetch('/api/notion')
      .then(res => res.json())
      .then(notionPages => {
        if (notionPages?.statusCode === 200) {
          setNotionPages(notionPages.data)
          return
        }

        throw new Error(notionPages.message);
      })
      .catch(error => console.log('my error: ', error.message));
  }, [])

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        noWrap
        component="h2"
        // TODO: change color
        sx={{ color: 'grey.dark' }}
      >
        Notion
      </Typography>
      <Select notionPages={notionPages} handleClick={handleClick} />
      {/* TODO: preview */}
    </>
  )
};

export default Notion;