import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { StateType } from './redux-store';

type iData = Record<string, unknown>;
type Action = { data: iData; type: '@COMMON/SET_DATA' };

interface Return {
  data: iData;
  setData: (data: iData) => void;
}

interface iDataState {
  data: iData;
}

const initialState: iDataState = {
  data: {},
};

export function reducer(state = initialState, action: Action): iDataState {
  switch (action.type) {
    case '@COMMON/SET_DATA':
      return { data: { ...state.data, ...action.data } };
    default:
      return state;
  }
}

export const useCommonData = (): Return => {
  const { data } = useSelector(({ commonReducer }: StateType) => commonReducer, shallowEqual);
  const dispatch = useDispatch();

  const setData = useCallback((data: iData) => {
    dispatch({ data, type: '@COMMON/SET_DATA' });
  }, []);

  return {
    data,
    setData,
  };
};

export default useCommonData;
