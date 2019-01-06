import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state';
import { searchForArticlesAction, resetSearchResultsAction } from '../store/actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl: FormControl;
  private _destroyed;

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
        if (val)
        this._store.dispatch(new searchForArticlesAction(val));
      })
    ).subscribe();
  }

  onReset() {
    this.searchControl.reset('');
    this._store.dispatch(new resetSearchResultsAction());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
