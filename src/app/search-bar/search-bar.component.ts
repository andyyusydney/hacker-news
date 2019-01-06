import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state';
import { ActionTypes, searchForArticlesAction, toggleSearchProgressAction } from '../store/actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl: FormControl;
  private _destroyed;
  result$: Observable<Array<any>>;
  loading$: Observable<boolean>;

  constructor(
    private _store: Store<AppState>
  ) {
    this._destroyed = new Subject<void>();
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      takeUntil(this._destroyed),
      distinctUntilChanged(),
      tap(val => {
        console.log('val=', val);
        this._store.dispatch(new searchForArticlesAction(val));
      })
    ).subscribe();

    this.result$ = this._store.pipe(
      takeUntil(this._destroyed),
      select(state => state.app.result),
      tap(searchResult => {
        console.log('searchResult=', searchResult);
      })
    );

    this.loading$ = this._store.pipe(
      takeUntil(this._destroyed),
      select(state => state.app.searchInProgress),
      tap(searchInProgress => {
        console.log('searchInProgress=', searchInProgress);
      })
    );
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
