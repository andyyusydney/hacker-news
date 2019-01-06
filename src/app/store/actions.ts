import { Action } from '@ngrx/store';

export enum ActionTypes {
    TOGGLE_SEARCH_PROGRESS = '[Search] Toggle Search Progress',
    SEARCH_FOR_ARTICLES = '[Search] Search For Articles',
    SAVE_SEARCH_RESULTS = '[Search] Save Search Results',
    MOVE_PAGE = '[Search] Move Page',
    RESET_SEARCH = '[Search] Reset Search'
}

export class toggleSearchProgressAction implements Action {
  readonly type = ActionTypes.TOGGLE_SEARCH_PROGRESS;
  constructor(public payload: boolean) {}
}

export class searchForArticlesAction implements Action {
  readonly type = ActionTypes.SEARCH_FOR_ARTICLES;
  constructor(public payload: string) {}
}

export class saveSearchResultsAction implements Action {
  readonly type = ActionTypes.SAVE_SEARCH_RESULTS;
  constructor(public payload: []) {}
}

export class resetSearchResultsAction implements Action {
  readonly type = ActionTypes.RESET_SEARCH;
  constructor() {}
}

export class movePage implements Action {
  readonly type = ActionTypes.MOVE_PAGE;
  constructor(public payload: string) {}
}

export type AppActions = 
  toggleSearchProgressAction | 
  searchForArticlesAction | 
  saveSearchResultsAction | 
  movePage |
  resetSearchResultsAction;