import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Mission, MissionStatus, MissionStatusFilter } from './types';
import { MissionService } from './mission.service';
import { MatDialog } from '@angular/material/dialog';
import { MissionModalService } from './mission-modal/mission-modal.service';
import { MISSION_STATUS_FILTERS, MISSION_STATUS_TYPES } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  missionStatusTypes = MISSION_STATUS_TYPES;
  missionStatusFilterTypes = MISSION_STATUS_FILTERS;
  missions: Mission[] = [];
  searchText = '';
  statusFilter: string = MissionStatusFilter.NO_FILTER;

  constructor(
    private missionService: MissionService,
    public dialog: MatDialog,
    public missionsModalService: MissionModalService
  ) {}

  ngOnInit() {
    this.missionService.getMissions().subscribe((missions) => {
      this.missions = missions;
    });
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
