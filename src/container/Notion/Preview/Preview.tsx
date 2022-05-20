import React, { useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Component from './Type';

type Props = {
  previewData: Notion.BlocksData[];
};

const { Code } = Component

const Preview = ({ previewData }: Props) => {
  const titleIndexRef = useRef<number>(1);
  const notionPreview = useMemo(() => (
    previewData.map((data, idx) => {
      const previewContent = data[data.type];
      const titleIndex = titleIndexRef.current;
      let children;

      switch (data.type) {
        case "code": {
          children = <Code content={previewContent} titleIndex={titleIndex} />;
          break;
        };
        case "paragraph": break;
        case "toggle": break;
        case "heading_1": break;
        case "heading_2": break;
        case "heading_3": break;
        case "divider": break;
        case "numbered_list_item": break;
        case "callout": break;
        default:
      }

      if (children) titleIndexRef.current += 1;

      return <Box key={`__${data.type}_${idx}`}>
        {children}
      </Box>
    })
  ), [previewData])

  return (
    <React.Fragment>
      <Typography
        variant="h4"
        noWrap
        component="h3"
        // TODO: change color
        sx={{ color: 'primary.main', textAlign: 'center', mt: 1 }}
      >
        Preview
      </Typography>
      {notionPreview}
    </React.Fragment>
  )
}

export default Preview