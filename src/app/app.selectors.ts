import { createSelector } from '@ngrx/store';
import { AppState } from './store/state';
import { isNumber } from 'lodash';
import { AppConfig } from './app.config';

const getAppState = createSelector((state: AppState) => state.app);
const getCurrPage = createSelector(getAppState, (state: any) => state.app.currPage);
const getSearchResult = createSelector(getAppState, (state: any) => state.app.result);
const getTotalPages = createSelector(getSearchResult, (state: any) => Math.round(state.length/AppConfig.pageSize));
const getResultByPageIndex = createSelector(getSearchResult, (searchResult: [], pageIndex: number) => {
    if (!searchResult || searchResult.length === 0 || !isNumber(pageIndex))
      return null;

    const currList = searchResult.slice(AppConfig.pageSize * (pageIndex - 1), AppConfig.pageSize * pageIndex);
    return currList;
  }
);

export const AppSelectors = {
    getResultByPageIndex,
    getCurrPage,
    getTotalPages
};