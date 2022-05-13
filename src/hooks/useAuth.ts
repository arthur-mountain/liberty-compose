import { createContext, useContext, useReducer } from 'react';

enum ActionTypes {
  INIT,
  INIT_SUCCESS,
  INIT_FAIL
}

type Store = {
  isLoading: boolean;
}

type Action = {
  type: number,
  payload?: any;
}

export const AuthCtx = createContext<{ store, action }>(null);
export const useAuthCtx = () => useContext(AuthCtx);

// For fratures can add additional type condition.
function reducer(store: Store, action: Action) {
  switch (action.type) {
    case ActionTypes.INIT_SUCCESS:
      return {
        ...store,
        isLoading: false,
      };

    default:
      break;
  };

  return { ...store };
}

const initStore: Store = {
  isLoading: true,
}

function useAuth() {
  const [store, dispatch] = useReducer(reducer, initStore);

  const action = {
    init: () => {
      dispatch({ type: ActionTypes.INIT_SUCCESS })
    },
  };

  return [store, action];
}

export default useAuth;