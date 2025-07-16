import { Component, OnInit } from '@angular/core';
import { Mission, MissionStatusFilter } from './types';
import { MatDialog } from '@angular/material/dialog';
import { MissionModalService } from './mission-modal/mission-modal.service';
import { MISSION_STATUS_FILTERS, MISSION_STATUS_TYPES } from './constants';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectMissions,
  selectSearchQuery,
  selectStatusFilter,
} from './missions-store/selectors';
import { MissionsState } from './missions-store/reducer';
import { loadMissions } from './missions-store/actions';
import * as Actions from './missions-store/actions';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  MissionStatusFilterEnum = MissionStatusFilter;
  missions$: Observable<Mission[]>;
  searchQuery$: Observable<string>;
  statusFilter$: Observable<MissionStatusFilter>;

  constructor(
    private store: Store<MissionsState>,
    public dialog: MatDialog,
    public missionsModalService: MissionModalService
  ) {
    this.missions$ = this.store.select(selectMissions);
    this.searchQuery$ = this.store.select(selectSearchQuery());
    this.statusFilter$ = this.store.select(selectStatusFilter());
  }

  ngOnInit(): void {
    this.store.dispatch(loadMissions());
  }

  setSearchQuery(query: string) {
    this.store.dispatch(Actions.setSearchQuery({ query }));
  }

  setStatusFilter(status: MissionStatusFilter) {
    this.store.dispatch(Actions.setStatusFilter({ statusFilter: status }));
  }

  shouldShowMission(
    mission: Mission,
    searchQuery: string | null,
    statusFilter: MissionStatusFilter | null
  ): boolean {
    if (!mission.name.includes(searchQuery || '')) {
      return false;
    }

    if (statusFilter === MissionStatusFilter.NO_FILTER) {
      return true;
    }

    return (mission.status as string) === statusFilter;
  }
}
