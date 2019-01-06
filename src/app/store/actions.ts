import { Action } from '@ngrx/store';

export enum ActionTypes {
    TOGGLE_SEARCH_PROGRESS = '[Search] Toggle Search Progress',
    SEARCH_FOR_ARTICLES = '[Search] Search For Articles',
    SAVE_SEARCH_RESULTS = '[Search] Save Search Results'
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

export type AppActions = toggleSearchProgressAction | searchForArticlesAction | saveSearchResultsAction;