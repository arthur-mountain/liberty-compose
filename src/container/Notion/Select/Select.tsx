import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type Props = {
  notionPages: Notion.NotionPages[];
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, pageId: Notion.NotionPages) => void;
}
// https://mui.com/material-ui/react-tree-view/; @mui/lab is unstable;
const Select = ({ notionPages = [], handleClick }: Props) => {
  const renderTree = (pages, elements = []) => {
    pages.forEach((page) => {
      const id = page?.pageId || page?.id;
      const title = page?.title || page?.[page.type]?.title || page?.[page.type]?.rich_text?.[0]?.plain_text;

      elements.push(<Button key={`${title}-${id}`} size="large" variant="outlined" onClick={(e) => handleClick(e, page)}>
        <li >{title}</li>
      </Button>)

      if (page?.children?.data) renderTree(page.children.data, elements);
    })

    return elements;
  }

  return (
    <ButtonGroup orientation="vertical">
      {renderTree(notionPages)}
    </ButtonGroup>
  )
}

export default Select