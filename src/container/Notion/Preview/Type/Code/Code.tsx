import React from 'react';

type Props = {
  content: Notion.Code;
  titleIndex: number;
}

const Code = ({ content, titleIndex }: Props) => {

  return (
    <div>
      {titleIndex}. {content.language}
    </div>
  )
}

export default Code