import { Injectable } from '@angular/core';
import { MissionModalComponent } from './mission-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MissionModalService {
  DIALOG_WIDTH = '30vw';
  DIALOG_HEIGHT = '70vw';

  constructor(public dialog: MatDialog) {}

  editMission(id: number) {}

  createMission() {
    this.openMissionDialog({ title: 'יצירת משימה', mission: undefined })
      .afterClosed()
      .subscribe((ret) => console.log(JSON.stringify(ret)));
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
