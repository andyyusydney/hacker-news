import { AppActions, ActionTypes } from './actions';
import { AppState, initialState } from './state';

export function reducers(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.TOGGLE_SEARCH_PROGRESS: {
      return {
        ...state,
        ... {
          ...state.app,
          searchInProgress: action.payload ? action.payload : !state.app.searchInProgress
        }
      };
    }
    case ActionTypes.SAVE_SEARCH_RESULTS: {
      return {
        ...state,
        ...{
          ...state.app,
          result: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}