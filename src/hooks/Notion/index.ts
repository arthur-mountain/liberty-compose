import { useReducer, useState } from 'react';
import { getNotionPages, getPageBlocks } from 'services/Notion';

enum ActionTypes {
  INIT,
  INIT_SUCCESS,
  INIT_FAIL,
  GET_BLOCKS,
  GET_BLOCKS_SUCCESS,
  GET_BLOCKS_FAIL,
}

type Store = {
  isLoading: boolean;
  notionPages: Notion.NotionPages[];
  previewData: Notion.BlocksData[];
}

type Action = {
  init: () => void;
  getBlocks: (params) => void;
}

type ActionReducer = { type: number, payload?: any };

// For fratures can add additional type condition.
function reducer(store: Store, action: ActionReducer) {
  switch (action.type) {
    case ActionTypes.INIT:
      return store;

    case ActionTypes.INIT_SUCCESS:
      return {
        ...store,
        isLoading: false,
        notionPages: action.payload.notionPages || [],
      };

    case ActionTypes.GET_BLOCKS_SUCCESS:
      return {
        ...store,
        isLoading: false,
        notionPages: action.payload.notionPages || store.notionPages,
      };

    default:
      break;
  };

  return { ...store };
}

const initStore: Store = {
  isLoading: true,
  notionPages: [],
  previewData: [],
}


function useNotion(): [Store, Action] {
  const [store, dispatch] = useReducer(reducer, initStore);
  // TODO: fixed to reducer state ?
  const [previewData, setPreviewData] = useState<Notion.BlocksData[]>([]);

  const assortPreviewOrChildData = (respData) => {
    const childData = [];
    const previewData = respData.data.filter(d => {
      if (d.type !== 'child_page') return true;
      childData.push(d);
    });

    setPreviewData(prev => [...prev, ...previewData]);
    return { ...respData, data: childData };
  }

  const appendChildrenPage = (pages, pageId, respData) => {
    const newRespData = assortPreviewOrChildData(respData);

    return pages.map(page => {
      const id = page?.id || page?.pageId;
      const children = { ...newRespData, };

      if (id === pageId) return { ...page, children };

      if (page?.children) {
        return {
          ...page,
          children: {
            ...page.children,
            data: appendChildrenPage(page.children.data, pageId, children)
          }
        }
      };

      return page
    });
  };

  const action = {
    init: async () => {
      dispatch({ type: ActionTypes.INIT })

      try {
        const { data } = await getNotionPages();

        if (data.statusCode === 200) {
          dispatch({
            type: ActionTypes.INIT_SUCCESS,
            payload: {
              notionPages: data.items.data,
            },
          })
        }
      } catch (error) {
        // TODO: add error state
        dispatch({ type: ActionTypes.INIT_FAIL })
      }
    },
    getBlocks: async ({ pageId, perPage = 20 }) => {
      dispatch({ type: ActionTypes.GET_BLOCKS })

      try {
        const { data } = await getPageBlocks({ pageId, perPage });

        if (data.statusCode === 200) {
          const notionPages = appendChildrenPage(store.notionPages, pageId, data.items.data);

          dispatch({
            type: ActionTypes.GET_BLOCKS_SUCCESS,
            payload: {
              notionPages,
            },
          })
        }
      } catch (error) {
        // TODO: add error state
        dispatch({ type: ActionTypes.GET_BLOCKS_FAIL })
      }
    }
  };

  return [{
    ...store, previewData
  }, action];
}

export default useNotion;