import { createContext, useContext, useReducer } from 'react';
import { Theme } from '@mui/material/styles';
// import { lineLogin } from 'services/Login'

enum ActionTypes {
  INIT,
  INIT_SUCCESS,
  INIT_FAIL,
  CHANGE_THEME
}

type Store = {
  isLoading: boolean;
  customTheme: Theme;
}

type Action = {
  init: () => void;
  changeTheme: (params: Theme) => void;
}

type ActionReducer = { type: number, payload?: any };

export const AuthCtx = createContext<{ store: Store, action: Action }>(null);
export const useAuthCtx = () => useContext(AuthCtx);

// For fratures can add additional type condition.
function reducer(store: Store, action: ActionReducer) {
  switch (action.type) {
    case ActionTypes.INIT_SUCCESS:
      return {
        ...store,
        isLoading: false,
      };

    case ActionTypes.CHANGE_THEME:
      return {
        ...store,
        customTheme: action.payload.customTheme
      };

    default:
      break;
  };

  return { ...store };
}

const initStore: Store = {
  isLoading: true,
  customTheme: null
}

function useAuth(): [Store, Action] {
  const [store, dispatch] = useReducer(reducer, initStore);

  const action = {
    init: () => {
      dispatch({ type: ActionTypes.INIT_SUCCESS })
    },
    changeTheme: (params) => {
      dispatch({
        type: ActionTypes.CHANGE_THEME, payload: {
          customTheme: params
        }
      })
    },
  };

  return [store, action];
}

export default useAuth;