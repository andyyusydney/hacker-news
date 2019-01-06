import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from './state';
import {
    debounceTime,
    switchMap
} from 'rxjs/operators';
import { HackerNewsService } from '../services';
import { ActionTypes, saveSearchResultsAction, toggleSearchProgressAction } from './actions';

@Injectable({providedIn: 'root'})
export class AppEffects {
  constructor(
      private dataService: HackerNewsService,
      private actions$: Actions,
      private _store: Store<AppState>
    ) {}

  @Effect()
  toggleSearchProgress = this.actions$.pipe(
    ofType(ActionTypes.SEARCH_FOR_ARTICLES),
    debounceTime(500),
    switchMap((action:any) => {
        this._store.dispatch(new toggleSearchProgressAction(true));

        return this.dataService.search(action.payload)
            .pipe(
                switchMap(res => [
                    new toggleSearchProgressAction(false),
                    new saveSearchResultsAction(res)
                ])
            );
    })
  );
}