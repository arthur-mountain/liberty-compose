declare namespace Notion {
  interface NotionPages {
    category: string;
    pageId: string;
    pageUrl: string;
    priority: number;
    title: string;
    children: ChildrenData[];
  };

  interface ChildrenData {
    hasMoreParams: boolean;
    data: Notion.BlocksData[];
  };

  type BlocksData = {
    object: "block";
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: { object: "user"; id: string; },
    last_edited_by: { object: "user"; id: string; },
    has_children: boolean;
    archived: boolean;
    type: Notion.PreviewBlockType,
    [key: Notion.PreviewBlockType]: {
      rich_text: Notion.RichTextDefault[],
      color: string;
    };
  } & Divider & Callout & Code & ChildPage;

  type PreviewBlockType = "heading_1" | "heading_2" | "heading_3" | "paragraph" | "code" | "divider" | "toggle" | "numbered_list_item" | "callout" | "child_page";

  type RichTextDefault = {
    type: "text",
    text: { content: string; link: string; };
    annotations: {
      bold: boolean; italic: boolean; strikethrough: boolean; underline: boolean; code: boolean; color: string;
    },
    plain_text: string;
    href: string;
  };

  type Divider = {}

  type Callout = {
    rich_text: Notion.RichTextDefault[];
    icon: { type: "emoji"; emoji: "💡"; };
    color: string;
  }

  type Code = {
    caption: any; // Not sure value
    rich_text: Notion.RichTextDefault[];
    language: "javascript";
  }

  type ChildPage = { child_page: { title: string; } };
}