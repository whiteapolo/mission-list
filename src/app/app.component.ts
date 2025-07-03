import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Mission, MissionStatus } from './types';
import { MissionService } from './mission.service';
import { MatDialog } from '@angular/material/dialog';
import { MissionModalService } from './mission-modal/mission-modal.service';
import { EMPTY_MISSION, MISSION_STATUS_TYPES } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  missionStatusTypes = MISSION_STATUS_TYPES;
  missionsRoot: Mission = EMPTY_MISSION;
  searchText = '';
  NO_STATUS_FILTER_STRING = 'ללא סינון';
  statusToFilter: MissionStatus | string = this.NO_STATUS_FILTER_STRING;

  constructor(
    private missionService: MissionService,
    public dialog: MatDialog,
    public missionsModalService: MissionModalService
  ) {}

  ngOnInit() {
    this.missionService
      .getMissions()
      .subscribe((root) => (this.missionsRoot = root));
  }

  public shouldShowMission(mission: Mission) {
    return (
      mission.title.includes(this.searchText) &&
      (mission.status === this.statusToFilter ||
        this.statusToFilter === this.NO_STATUS_FILTER_STRING)
    );
  }
}
