import type { NextApiRequest, NextApiResponse } from 'next';

// TODO: create url for redirct to line login Oauth2;
const handler = async (_: NextApiRequest, res: NextApiResponse) => {


  res.status(200).json({ statusCode: 200, data: 'success' });
};

export default handler;