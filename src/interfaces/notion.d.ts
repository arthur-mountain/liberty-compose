declare namespace Notion {
  interface NotionPages {
    category: string;
    pageId: string;
    pageUrl: string;
    priority: number;
    title: string;
    children: NotionPages[];
  };

  interface SubNavList {
    hasMoreParams: boolean;
    data: Notion.SubNavListData[];
  };

  type SubNavListData = {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: {
      object: string;
      id: string;
    },
    last_edited_by: {
      object: string;
      id: string;
    },
    has_children: boolean;
    archived: boolean;
    type: string; // should contrains
    child_page: {
      title: string;
    }
  };
}