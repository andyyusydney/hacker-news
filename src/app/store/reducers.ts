import { AppActions, ActionTypes } from './actions';
import { AppState, initialState } from './state';

export function reducers(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.TOGGLE_SEARCH_PROGRESS: {
      return {
        app: {
          ...state.app,
          searchInProgress: action.payload ? action.payload : !state.app.searchInProgress
        }
      };
    }
    case ActionTypes.SAVE_SEARCH_RESULTS: {
      return {
        app: {
          ...state.app,
          result: action.payload,
          currPage: 1
        }
      };
    }
    case ActionTypes.MOVE_PAGE: {
      return {
        app: {
          ...state.app,
          currPage: action.payload === 'prev' ? state.app.currPage - 1 : state.app.currPage + 1
        }
      };
    }
    case ActionTypes.RESET_SEARCH: {
      return {
        app: {
          ...state.app,
          result: [],
          currPage: 0
        }
      };
    }
    default: {
      return state;
    }
  }
}