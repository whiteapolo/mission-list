import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MissionsState } from '../missions-store/reducer';
import { MatSelectChange } from '@angular/material/select';
import * as Actions from '../missions-store/actions';
import { MISSION_STATUS_FILTERS, MISSION_STATUS_TYPES } from '../constants';
import { selectStatusFilter } from '../missions-store/selectors';
import { MissionStatusFilter } from '../types';
import { Observable } from 'rxjs';

@Component({
  selector: 'status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.less'],
})
export class StatusFilterComponent {
  missionStatusTypes = MISSION_STATUS_TYPES;
  missionStatusFilterTypes = MISSION_STATUS_FILTERS;
  statusFilter$: Observable<MissionStatusFilter>;

  constructor(private store: Store<MissionsState>) {
    this.statusFilter$ = this.store.select(selectStatusFilter());
  }

  setStatusFilter(event: MatSelectChange): void {
    this.store.dispatch(
      Actions.setStatusFilter({
        statusFilter: event.value,
      })
    );
  }
}
