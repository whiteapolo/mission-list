import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Mission, MissionStatus, MissionStatusFilter } from './types';
import { MatDialog } from '@angular/material/dialog';
import { MissionModalService } from './mission-modal/mission-modal.service';
import {
  MISSION_STATUS_FILTERS,
  MISSION_STATUS_TYPES,
  MISSIONS_LOCAL_STORAGE_KEY,
} from './constants';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMissions } from './missions-store/selectors';
import { MissionsState } from './missions-store/reducer';
import { loadMissions } from './missions-store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  missionStatusTypes = MISSION_STATUS_TYPES;
  missionStatusFilterTypes = MISSION_STATUS_FILTERS;
  missions$: Observable<Mission[]>;
  searchText = '';
  statusFilter: string = MissionStatusFilter.NO_FILTER;

  constructor(
    private store: Store<MissionsState>,
    public dialog: MatDialog,
    public missionsModalService: MissionModalService
  ) {
    this.missions$ = this.store.select(selectMissions);
  }

  resetLocalStorage(): void {
    fetch('/assets/missions.json')
      .then((res) => res.json())
      .then((json) =>
        localStorage.setItem(MISSIONS_LOCAL_STORAGE_KEY, JSON.stringify(json))
      )
      .catch((e) => console.log(e));
  }

  ngOnInit(): void {
    // this.resetLocalStorage();
    this.store.dispatch(loadMissions());
  }

  public shouldShowMission(mission: Mission) {
    if (!mission.name.includes(this.searchText)) {
      return false;
    }

    if (this.statusFilter === MissionStatusFilter.NO_FILTER) {
      return true;
    }

    return mission.status === (this.statusFilter as MissionStatus);
  }
}
