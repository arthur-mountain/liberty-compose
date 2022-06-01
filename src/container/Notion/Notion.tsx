import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useNotion from 'hooks/Notion';
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
  const [{ notionPages, isLoading, previewData }, action] = useNotion();
  const cacheCheckIsClicked = useRef({});

  const handleClick = async (e, page) => {
    e.preventDefault();

    if (page.has_children && !page.has_children) return;

    const pageId = page?.pageId || page?.id;

    if (cacheCheckIsClicked.current[pageId]) return;

    cacheCheckIsClicked.current = {
      ...cacheCheckIsClicked.current,
      [pageId]: 1
    };

    action.getBlocks({ pageId, perPage: 20 })
  };

  useEffect(() => action.init(), [])

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
        { display: 'flex', alignItems: 'flex-start', justifyContent: 'center' },
        { flexWrap: { xs: 'wrap', sm: 'nowrap' }, }
      ]}>
        {/* TODO: RWD should fixed */}
        <Box sx={[
          { height: isLoading ? 300 : 'auto' },
          { flexBasis: { xs: '100%', sm: '30%' }, mr: { xs: 0, sm: 2.5 }, mb: { xs: 1.5, sm: 0 } }
        ]}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Select notionPages={notionPages} handleClick={handleClick} />
          )}
        </Box>
        <Box sx={[
          { border: ({ palette }) => `1px solid ${palette.grey['900']}`, minHeight: '100vh', },
          { flexBasis: { xs: '100%', sm: '70%' }, }
        ]}>
          <Preview previewData={previewData} />
        </Box>
      </Box>
    </>
  )
};

export default Notion;