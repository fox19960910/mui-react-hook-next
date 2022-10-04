import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { StateType } from './redux-store';

type Action =
  | { darkMode: DarkMode; type: '@THEME/SET_DARKMODE' }
  | { openMainDrawer: boolean; type: '@THEME/SET_OPEN_MAIN_DRAWER' };

interface Return {
  darkMode: DarkMode;
  openMainDrawer: boolean;
  setDarkMode: (darkMode: DarkMode) => void;
  setOpenMainDrawer: (openMainDrawer: boolean) => void;
}

type MixedType = DarkModeState & MainDrawerOpenState;

const initialState: MixedType = {
  darkMode: 'light',
  openMainDrawer: true,
};

export function reducer(state = initialState, action: Action): MixedType {
  switch (action.type) {
    case '@THEME/SET_DARKMODE':
      return { ...state, darkMode: action.darkMode };
    case '@THEME/SET_OPEN_MAIN_DRAWER':
      return { ...state, openMainDrawer: action.openMainDrawer };
    default:
      return state;
  }
}

export const useUiState = (): Return => {
  const { darkMode, openMainDrawer } = useSelector(
    ({ uiState }: StateType) => uiState,
    shallowEqual
  );
  const dispatch = useDispatch();

  const setDarkMode = useCallback((darkMode: DarkMode) => {
    dispatch({ darkMode, type: '@THEME/SET_DARKMODE' });
  }, []);

  const setOpenMainDrawer = useCallback((openMainDrawer: boolean) => {
    dispatch({ openMainDrawer, type: '@THEME/SET_OPEN_MAIN_DRAWER' });
  }, []);

  return {
    darkMode,
    openMainDrawer,
    setDarkMode,
    setOpenMainDrawer,
  };
};

export default useUiState;
