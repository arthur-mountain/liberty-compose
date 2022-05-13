declare namespace Notion {
  interface NavList {
    category: string;
    pageId: string;
    pageUrl: string;
    priority: number;
    title: string;
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