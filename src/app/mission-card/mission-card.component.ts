import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../mission';
import { MissionService } from '../mission.service';

@Component({
  selector: 'mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.less'],
})
export class MissionCardComponent {
  constructor(public missionService: MissionService) {}

  @Input() mission!: Mission;
  isMissionChildrenVisible: boolean = false;

  toggleMissionChildrenVisibility() {
    this.isMissionChildrenVisible = !this.isMissionChildrenVisible;
  }
}
