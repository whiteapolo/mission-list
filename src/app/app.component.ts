import { Component, OnInit } from '@angular/core';
import { Mission } from './mission';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MissionService } from './mission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    missions: Mission[] = [];
    
    constructor(private missionService: MissionService) {}

    ngOnInit() {
      this.missionService.getMissions().subscribe(missions => this.missions = missions);
    }
}