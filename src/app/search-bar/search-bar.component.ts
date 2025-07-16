import { Component, OnInit } from '@angular/core';
import { MissionsState } from '../missions-store/reducer';
import { Store } from '@ngrx/store';
import * as Actions from '../missions-store/actions';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less'],
})
export class SearchBarComponent {
  constructor(private store: Store<MissionsState>) {}

  setSearchQuery(event: Event): void {
    this.store.dispatch(
      Actions.setSearchQuery({
        query: (event.target as HTMLInputElement).value,
      })
    );
  }
}
