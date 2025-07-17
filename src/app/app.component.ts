import { Component, OnInit } from '@angular/core';
import { Mission, MissionStatusFilter } from './types';
import { MatDialog } from '@angular/material/dialog';
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
import { IconService } from './icon.service';
import { MissionModalComponent } from './mission-modal/mission-modal.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  MissionStatusFilterEnum = MissionStatusFilter;
  missions$: Observable<Mission[]>;
  statusFilterControl = new FormControl(MissionStatusFilter.NO_FILTER);
  searchQueryControl = new FormControl('');

  constructor(
    private store: Store<MissionsState>,
    public dialog: MatDialog,
    private iconService: IconService
  ) {
    this.missions$ = this.store.select(selectMissions);
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

  createMission() {
    this.dialog.open(MissionModalComponent, {
      width: '300px',
      height: '70vh',
      hasBackdrop: true,
    });
  }

  shouldShowMission(mission: Mission): boolean {
    if (!mission.name.includes(this.searchQueryControl.value || '')) {
      return false;
    }

    if (this.statusFilterControl.value === MissionStatusFilter.NO_FILTER) {
      return true;
    }

    return (mission.status as string) === this.statusFilterControl.value;
  }
}
