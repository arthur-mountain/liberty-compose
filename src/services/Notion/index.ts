import instance from 'services/apiInstance';

export const getNotionPages = async () => {
  const url = '/api/notion';

  return instance.get(url);
};

type SearchBlocksParams = {
  pageId: string;
  perPage: number;
}

export const getPageBlocks = async (params: SearchBlocksParams) => {
  const url = '/api/notion/page';

  return instance.post(url, params);
};
