import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Mission } from '../mission';
import { MissionStatus } from '../mission-status';
import { MissionService } from '../mission.service';

interface MissionModalData {
  mission: Mission,
  title: string,
}

@Component({
  selector: 'app-mission-modal',
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.less']
})
export class MissionModalComponent {
  
  missionStatusTypes = Object.values(MissionStatus);
  flatMissionsArray: Mission[] = [];
  mission: Mission | undefined;

  constructor(
    public dialogRef: MatDialogRef<MissionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissionModalData,
    private missionService: MissionService
  ) {
    this.mission = { ...data.mission };
    missionService.getMissionsAsFlatArray().subscribe(missions => {
      this.flatMissionsArray = missions;
    });
  }
 

  cancel() {
      console.log("Dialog canceled");
      this.dialogRef.close();
  }
  
  save() {
      console.log(`Dialog returns: '${JSON.stringify(this.mission)}'`, );
      this.dialogRef.close(this.mission);
  }
}
