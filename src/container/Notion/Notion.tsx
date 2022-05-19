import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getPageBlocks } from 'services/Notion';
import Skeleton from 'component/Loading/Skeleton/Skeleton';
import Select from './Select/Select';
import Preview from './Preview/Preview';

// TODO: shpuld use axios interator for error(422 default can't be catch);
// TODO: isLoading status;
// TODO: services axios intance should filter some information;
// TODO: variables should rename;
// TODO: add preview, depends on notion data type;
//   current known type has: child_page, toggle, code, photography
const Notion = () => {
  const [notionPages, setNotionPages] = useState<Notion.NotionPages[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewData, setPreviewData] = useState<Notion.BlocksData[]>([]);

  const assortPreviewOrChildData = (respData) => {
    const childData = [];
    const previewData = respData.data.filter(d => {
      if (d.type !== 'child_page') return true;
      childData.push(d);
    });

    setPreviewData(prev => [...prev, ...previewData]);
    return { ...respData, data: childData }
  }

  const appendChildrenPage = (pages, pageId, respData) => {
    const newRespData = assortPreviewOrChildData(respData);

    return pages.map(page => {
      const id = page?.id || page?.pageId;
      const children =
        { ...newRespData, title: page?.childe_page?.title || page?.title };

      if (id === pageId) return { ...page, children };

      if (page?.children) {
        return {
          ...page,
          children: {
            ...page.children,
            data: appendChildrenPage(page.children.data, pageId, children)
          }
        }
      };

      return page
    });
  };

  const handleClick = async (e, page) => {
    e.preventDefault();

    if (page.has_children && !page.has_children) return;
    setIsLoading(true);

    try {
      const pageId = page?.pageId || page?.id;
      const resp = await getPageBlocks({ pageId, perPage: 20 });
      const respData = resp.data.data;

      if (resp.data.statusCode === 200) {
        setNotionPages(prevPages => {
          return appendChildrenPage(prevPages, pageId, respData);
        });
      } else {
        throw new Error(resp.data.tatusCode);
      };
    } catch (error) {
      console.log('Get page blocks error: ', error);
    } finally { setIsLoading(false); }
  };

  useEffect(() => {
    setIsLoading(true);

    fetch('/api/notion')
      .then(res => res.json())
      .then(notionPages => {
        if (notionPages?.statusCode === 200) {
          setNotionPages(notionPages.data);
          setIsLoading(false);
          return
        }

        throw new Error(notionPages.message);
      })
      .catch(error => {
        console.log('my error: ', error.message)
        setIsLoading(false);
      });
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
      <Box sx={[
        { display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap' }
      ]}>
        {/* TODO: RWD should fixed */}
        {isLoading ? (
          <Skeleton >
            <Box sx={{ flex: 1 }}>
              <Select notionPages={notionPages} handleClick={handleClick} />
            </Box>
          </Skeleton>
        ) : (
          <Box sx={{ flex: 1 }}>
            <Select notionPages={notionPages} handleClick={handleClick} />
          </Box>
        )}
        <Box sx={{
          flex: 2,
          border: ({ palette }) => `1px solid ${palette.grey['900']}`,
          minHeight: '100vh',
        }}>
          <Preview previewData={previewData} />
        </Box>
      </Box>
    </>
  )
};

export default Notion;