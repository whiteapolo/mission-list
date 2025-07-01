import { Component, OnInit } from '@angular/core';
import { Mission } from './types';
import { MissionService } from './mission.service';
import { MatDialog } from '@angular/material/dialog';
import { MissionModalComponent } from './mission-modal/mission-modal.component';
import { MissionModalService } from './mission-modal/mission-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  missions: Mission[] = [];

  constructor(
    private missionService: MissionService,
    public dialog: MatDialog,
    public missionsModalService: MissionModalService
  ) {}

  ngOnInit() {
    this.missionService
      .getMissions()
      .subscribe((missions) => (this.missions = missions));
  }
}
