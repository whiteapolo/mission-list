import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MissionsState } from '../missions-store/reducer';
import { Store } from '@ngrx/store';
import * as Actions from '../missions-store/actions';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less'],
})
export class SearchBarComponent {
  @Output() change = new EventEmitter<string>();

  constructor() {}

  emitInputChange(event: Event): void {
    this.change.emit((event.target as HTMLInputElement).value);
  }
}
