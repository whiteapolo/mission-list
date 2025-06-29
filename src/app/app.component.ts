import { Component, OnInit } from '@angular/core';
import { Mission } from './mission';
import { MissionService } from './mission.service';
import { MatDialog } from '@angular/material/dialog';
import { MissionModalComponent } from './mission-modal/mission-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    missions: Mission[] = [];
    isModalVisible: boolean = false;

    toggleMissionModal() {
      this.isModalVisible = !this.isModalVisible;
    }
    
    openDialog() {
      const dialogRef = this.dialog.open(MissionModalComponent, {
        width: "30vw",
        height: "70vh",
        hasBackdrop: true,
        data: { title: "יצירת משימה", mission: undefined}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(`dialog closed: with: ${JSON.stringify(result)}`);
      });
    }
    
    constructor(
      private missionService: MissionService,
      public dialog: MatDialog
    ) {}

    ngOnInit() {
      this.missionService.getMissions().subscribe(missions => this.missions = missions);
    }
}