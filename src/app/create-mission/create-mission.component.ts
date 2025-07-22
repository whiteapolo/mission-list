import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MissionModalComponent } from '../mission-modal/mission-modal.component';

@Component({
  selector: 'create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.less'],
})
export class CreateMissionComponent {
  constructor(public dialog: MatDialog) {}

  createMission() {
    this.dialog.open(MissionModalComponent, {
      hasBackdrop: true,
    });
  }
}
