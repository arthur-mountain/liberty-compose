import type { NextApiRequest, NextApiResponse } from 'next';
import notion from 'server/notion'

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const [contents, error] = await notion.getDataBaseContents();

  if (error !== null) {
    res.status(500).json({ statusCode: 500, message: error })
    return;
  }

  res.status(200).json({ statusCode: 200, data: contents });
};

export default handler;