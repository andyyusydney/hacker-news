import { 
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  @Input() totalPages: Number;
  @Input() currPage: Number;
  @Output() pageChanged: EventEmitter<string>;

  constructor() {
    this.pageChanged = new EventEmitter<string>();
   }

  ngOnInit() {
  }
}
