import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../types';
import { MissionModalService } from '../mission-modal/mission-modal.service';
import { EMPTY, Observable } from 'rxjs';
import { MissionsState } from '../missions-store/reducer';
import { Store } from '@ngrx/store';
import {
  selectMissionChildren,
  selectMissionChildrenVisibility,
  selectMissions,
} from '../missions-store/selectors';
import * as Actions from '../missions-store/actions';

@Component({
  selector: 'mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.less'],
})
export class MissionCardComponent implements OnInit {
  @Input() mission!: Mission;
  missions$: Observable<Mission[]> = EMPTY;
  isChildrenVisible$: Observable<boolean> = EMPTY;

  constructor(
    public missionModelService: MissionModalService,
    private store: Store<MissionsState>
  ) {}
  ngOnInit(): void {
    this.missions$ = this.store.select(selectMissions);
    this.isChildrenVisible$ = this.store.select(
      selectMissionChildrenVisibility(this.mission.id)
    );
  }

  toggleChildrenVisibility() {
    this.store.dispatch(
      Actions.toggleMissionChildrenVisibility({ missionId: this.mission.id })
    );
  }

  getMissionChildren(): Observable<Mission[]> {
    return this.store.select(selectMissionChildren(this.mission.id));
  }

  deleteMission(): void {
    this.store.dispatch(Actions.deleteMission({ missionId: this.mission.id }));
  }

  editMission(): void {
    this.missionModelService.editMission(this.mission);
  }
}
