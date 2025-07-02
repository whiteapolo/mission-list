import { Component, Input } from '@angular/core';
import { Mission } from '../types';
import { MissionService } from '../mission.service';
import { MissionModalService } from '../mission-modal/mission-modal.service';
import { EMPTY_MISSION } from '../constants';

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

  @Input() mission: Mission = EMPTY_MISSION;
  isChildrenVisible: boolean = false;

  toggleChildrenVisibility() {
    this.isChildrenVisible = !this.isChildrenVisible;
  }
}
