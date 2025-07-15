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
  missionStatusTypes = MISSION_STATUS_TYPES;
  missionStatusFilterTypes = MISSION_STATUS_FILTERS;
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

  setSearchQuery(event: Event): void {
    this.store.dispatch(
      Actions.setSearchQuery({
        query: (event.target as HTMLInputElement).value,
      })
    );
  }

  setStatusFilter(event: MatSelectChange): void {
    this.store.dispatch(
      Actions.setStatusFilter({
        statusFilter: event.value,
      })
    );
  }

  shouldShowMission(
    mission: Mission,
    searchQuery: string | null,
    statusFilter: MissionStatusFilter | null
  ): boolean {
    return (
      mission.name.includes(searchQuery || '') &&
      ((mission.status as string) === statusFilter ||
        statusFilter === MissionStatusFilter.NO_FILTER)
    );
  }
}
