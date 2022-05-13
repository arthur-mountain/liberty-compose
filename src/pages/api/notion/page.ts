import type { NextApiRequest, NextApiResponse } from 'next';
import notion from 'server/notion'

type ResponseData = {}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (!req?.body?.pageId) {
    res.status(422).json({ statusCode: 422, message: 'without pageId' })
    return;
  }

  const params = {
    block_id: req.body.pageId,
    page_size: req.body.perPage
  }
  const [blocksData, error] = await notion.getBlocksData(params);

  if (error !== null) {
    return res.status(500).json({ statusCode: 500, message: error })
  }

  res.status(200).json({ statusCode: 200, data: blocksData });
};

export default handler;