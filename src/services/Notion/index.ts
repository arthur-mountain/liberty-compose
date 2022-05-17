import instance from 'services/apiInstance';

type SearchBlocksParams = {
  pageId: string;
  perPage: number;
}

export const getPageBlocks = (params: SearchBlocksParams) => {
  const url = '/api/notion/page';

  return instance.post(url, params);
};
