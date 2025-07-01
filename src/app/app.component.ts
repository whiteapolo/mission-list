import { Component, OnInit } from '@angular/core';
import { Mission } from './types';
import { MissionService } from './mission.service';
import { MatDialog } from '@angular/material/dialog';
import { MissionModalComponent } from './mission-modal/mission-modal.component';
import { MissionModalService } from './mission-modal/mission-modal.service';
import { EMPTY_MISSION } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  missionsRoot: Mission = EMPTY_MISSION;

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
}
