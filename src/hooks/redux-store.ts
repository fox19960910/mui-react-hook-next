import { useMemo } from 'react';
import { applyMiddleware, createStore, combineReducers, PreloadedState } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { reducer as uiState } from './useUiState';
import { reducer as commonReducer } from './useCommonData';
import { reducer as formReducer } from './useFormData';
const persistConfig = {
  key: 'root',
  storage,
};

const defaultReducer = combineReducers({
  uiState,
  commonReducer,
  formReducer,
});

const reducer = typeof window !== 'undefined' ? persistReducer(persistConfig, defaultReducer) : defaultReducer;

export type StateType = ReturnType<typeof reducer>;
type ReducerType = typeof defaultReducer;
type PersistReducerType = Extract<ReducerType, typeof reducer>;

function createReduxStore(preloadedState = {}) {
  return createStore(reducer as PersistReducerType, preloadedState, composeWithDevTools(applyMiddleware()));
}

type StoreT = ReturnType<typeof createReduxStore>;
type ST =
  | StoreT & {
      __PERSISTOR?: Persistor;
    };

let store: StoreT | undefined;

function initializeStore(preloadedState: PreloadedState<StateType>): StoreT {
  let _store: StoreT = store ?? createReduxStore(preloadedState);

  if (preloadedState && store) {
    _store = createReduxStore({ ...store.getState(), ...preloadedState });
    store = undefined;
  }

  if (typeof window === 'undefined') {
    return _store;
  }

  if (typeof window !== 'undefined') {
    (_store as ST).__PERSISTOR = persistStore(_store as any);
  }

  if (!store) {
    store = _store;
  }

  return _store;
}

export function useStore(initialState: PreloadedState<StateType>): ST {
  const _store = useMemo(() => initializeStore(initialState), [initialState]);
  store = _store;
  return _store;
}

export function getStore(): StoreT {
  return store as StoreT;
}
