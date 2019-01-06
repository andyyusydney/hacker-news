import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnInit {
  private _destroyed;
  result$: Observable<Array<any>>;
  loading$: Observable<boolean>;

  constructor(private _store: Store<AppState>) {
    this._destroyed = new Subject<void>();
  }

  ngOnInit() {
    this.result$ = this._store.pipe(
      takeUntil(this._destroyed),
      select(state => state.app.result),
      distinctUntilChanged(),
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

}
