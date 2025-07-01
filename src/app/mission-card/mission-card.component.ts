import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../types';
import { MissionService } from '../mission.service';
import { MissionModalService } from '../mission-modal/mission-modal.service';

@Component({
  selector: 'mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.less'],
})
export class MissionCardComponent {
  constructor(
    public missionService: MissionService,
    public missionModelService: MissionModalService
  ) {}

  @Input() mission!: Mission;
  isMissionChildrenVisible: boolean = false;

  toggleMissionChildrenVisibility() {
    this.isMissionChildrenVisible = !this.isMissionChildrenVisible;
  }
}
