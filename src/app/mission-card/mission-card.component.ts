import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../types';
import { MissionService } from '../mission.service';
import { MissionModalService } from '../mission-modal/mission-modal.service';

@Component({
  selector: 'mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.less'],
})
export class MissionCardComponent implements OnInit {
  @Input() mission!: Mission;
  missions: Mission[] = [];

  constructor(
    public missionService: MissionService,
    public missionModelService: MissionModalService
  ) {}

  ngOnInit(): void {
    this.missionService.getMissions().subscribe((missions) => {
      this.missions = missions;
    });
  }

  toggleChildrenVisibility() {
    this.mission.isChildrenVisible = !this.mission.isChildrenVisible;
  }

  getMissionChildren(missionUuid: string): Mission[] {
    return this.missionService.getMissionChildren(missionUuid);
  }
}
