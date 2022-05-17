import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';

type Props = {
  categories: Notion.Categories[];
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, pageId: string) => void;
}
// https://mui.com/material-ui/react-tree-view/
// TODO: Should use the tree view ui component includes the subnavs;
const Categories = ({ categories = [], handleClick }: Props) => {
  return (
    <ButtonGroup orientation="vertical">
      {categories.map(nav => (
        <Button
          key={nav.title}
          onClick={(e) => handleClick(e, nav.pageId)}
          size="large"
          variant="outlined"
        >
          <li >{nav.title}</li>
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default Categories