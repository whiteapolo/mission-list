import { Component, OnInit } from '@angular/core';
import { Mission } from './mission';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

    toggleMissionModal = () => {
      this.isModalVisible = !this.isModalVisible;
    }
    
    openDialog = (): void => {
      const dialogRef = this.dialog.open(MissionModalComponent, {
        width: "30vw",
        height: "70vh",
        hasBackdrop: true,
        data: { title: "יצירת משימה"}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log("dialog closed: ", JSON.stringify(result));
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