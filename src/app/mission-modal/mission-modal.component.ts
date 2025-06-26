import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Mission } from '../mission';
import { MissionStatus } from '../mission-status';

interface MissionModalData {
  mission: Mission,
  title: string,
}

@Component({
  selector: 'app-mission-modal',
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.less']
})
export class MissionModalComponent implements OnInit {
  
  missionStatusTypes = Object.values(MissionStatus);
  mission: Mission | undefined;

  constructor(
    public dialogRef: MatDialogRef<MissionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissionModalData) {
        this.mission = {...data.mission};
    }

  ngOnInit(): void {
  }

}
