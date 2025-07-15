import { Injectable } from '@angular/core';
import { MissionModalComponent } from './mission-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Mission, MissionStatus } from '../types';
import { MissionsState } from '../missions-store/reducer';
import { Store } from '@ngrx/store';
import * as Actions from '../missions-store/actions';

@Injectable({
  providedIn: 'root',
})
export class MissionModalService {
  DIALOG_WIDTH = '300px';
  DIALOG_HEIGHT = '70vh';

  constructor(public dialog: MatDialog, private store: Store<MissionsState>) {}

  editMission(mission: Mission) {
    this.openMissionDialog({ name: 'עריכת משימה', mission: mission })
      .afterClosed()
      .subscribe((newMissionValues) => {
        if (newMissionValues) {
          this.store.dispatch(
            Actions.updateMission({ ...mission, ...newMissionValues })
          );
        }
      });
  }

  createMission() {
    this.openMissionDialog({
      name: 'יצירת משימה',
      mission: { name: '', status: MissionStatus.ACTIVE },
    })
      .afterClosed()
      .subscribe((mission: Mission) => {
        if (mission) {
          this.store.dispatch(Actions.addMission({ mission }));
        }
      });
  }

  private openMissionDialog(data: any): MatDialogRef<MissionModalComponent> {
    return this.dialog.open(MissionModalComponent, {
      width: this.DIALOG_WIDTH,
      height: this.DIALOG_HEIGHT,
      hasBackdrop: true,
      data,
    });
  }
}
