/// <reference types="@notionhq/client" />
declare namespace NotionApi {
  interface NotionType {
    getDataBaseContents: () => [DataBaseData, NotionError];
    getBlocksData: (SearchBlocksData: SearchBlocksData) => [BlocksData, NotionError];
  }

  type SearchBlocksData = { block_id: string, page_size: number } | { block_id: string, start_cursor: string, page_size: number };

  type NotionError = APIResponseError | null;

  type DataBaseData = {
    title: string;
    pageId: string;
    pageUrl: string;
    priority: number;
    category: string;
  }[];

  type BlocksData = {
    hasMoreParams: {
      block_id: any;
      start_cursor: any;
      page_size: any;
    };
    data: any[];
  };
}