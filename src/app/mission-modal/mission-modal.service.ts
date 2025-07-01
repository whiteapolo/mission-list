import { Injectable } from '@angular/core';
import { MissionModalComponent } from './mission-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Mission } from '../types';
import { EMPTY_MISSION } from 'src/app/constants';
import { MissionService } from '../mission.service';

@Injectable({
  providedIn: 'root',
})
export class MissionModalService {
  DIALOG_WIDTH = '30vw';
  DIALOG_HEIGHT = '70vh';

  constructor(
    public dialog: MatDialog,
    public missionService: MissionService
  ) {}

  editMission(mission: Mission) {
    this.openMissionDialog({ title: 'עריכת משימה', mission: mission })
      .afterClosed()
      .subscribe((newMissionValues) =>
        this.missionService.updateMission(mission, newMissionValues)
      );
  }

  createMission() {
    this.openMissionDialog({ title: 'יצירת משימה', mission: EMPTY_MISSION })
      .afterClosed()
      .subscribe(
        (mission: Mission) => mission && this.missionService.addMission(mission)
      );
  }

  private openMissionDialog(data: any): MatDialogRef<MissionModalComponent> {
    return this.dialog.open(MissionModalComponent, {
      width: this.DIALOG_WIDTH,
      height: this.DIALOG_HEIGHT,
      hasBackdrop: true,
      data: data,
    });
  }
}
