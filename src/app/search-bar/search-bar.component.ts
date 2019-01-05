import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl: FormControl;
  private _destroyed;

  constructor() {
    this._destroyed = new Subject<void>();
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      takeUntil(this._destroyed),
      distinctUntilChanged(),
      tap(val => {
        console.log('val=', val);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
