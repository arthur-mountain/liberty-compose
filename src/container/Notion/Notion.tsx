import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// TODO: should split component...more;
// TODO: shpuld use axios interator for error(422 default can't be catch);
// TODO: isInit, isLoading status;
const Notion = () => {
  const [stateNavList, setStateNavList] = useState<Notion.NavList[]>([]);
  const [stateSubNavList, setStateSubNavList] = useState<Notion.SubNavList | null>(null);

  const handleClick = (e, pageId) => {
    e.preventDefault();

    fetch('/api/notion/page', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pageId, perPage: 20
      })
    })
      .then(res => res.json())
      .then(subNavList => {
        if (subNavList?.statusCode === 200) {
          setStateSubNavList(subNavList.data)
          return
        }

        throw new Error(subNavList.message);
      })
      .catch(error => console.log('my error: ', error.message));
  };

  useEffect(() => {
    fetch('/api/notion')
      .then(res => res.json())
      .then(navList => {
        if (navList?.statusCode === 200) {
          setStateNavList(navList.data)
          return
        }

        throw new Error(navList.message);
      })
      .catch(error => console.log('my error: ', error.message));
  }, [])

  return (
    <Container disableGutters fixed>
      Notion<br />
      <ButtonGroup orientation="vertical">
        {stateNavList?.map(nav => (
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
      <hr></hr>
      {stateSubNavList?.data?.map(subNav => (
        <div key={subNav.id}>
          {/* type Condition, like toggle without child_page.title */}
          {subNav?.child_page?.title}
        </div>
      ))}
    </Container>
  )
}

export default Notion