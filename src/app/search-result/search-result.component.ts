import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap, switchMap } from 'rxjs/operators';
import { AppSelectors } from '../app.selectors';
import { movePage } from '../store/actions'

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
  currPage$: Observable<number>;
  totalPages$: Observable<number>;

  constructor(private _store: Store<AppState>) {
    this._destroyed = new Subject<void>();
  }

  ngOnInit() {
    this.currPage$ = this._store.pipe(
      takeUntil(this._destroyed),
      select(AppSelectors.getCurrPage)
    );

    this.totalPages$ = this._store.pipe(
      takeUntil(this._destroyed),
      select(AppSelectors.getTotalPages)
    );

    this.result$ = this.currPage$.pipe(
      switchMap(currPage => {
        return this._store.pipe(
          takeUntil(this._destroyed),
          select(AppSelectors.getResultByPageIndex, currPage),
          distinctUntilChanged()
        )
      })
    );

    this.loading$ = this._store.pipe(
      takeUntil(this._destroyed),
      select(state => state.app.searchInProgress)
    );
  }

  onPageChanged(moveDirection) {
    this._store.dispatch(new movePage(moveDirection));
  }

}
