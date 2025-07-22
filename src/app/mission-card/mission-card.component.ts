import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../types';
import { EMPTY, Observable } from 'rxjs';
import { MissionsState } from '../missions-store/missions.reducer';
import { Store } from '@ngrx/store';
import {
  selectIsMissionChildrenDisplayed,
  selectMissionChildren,
} from '../missions-store/missions.selectors';
import * as Actions from '../missions-store/missions.actions';
import { MissionModalComponent } from '../mission-modal/mission-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.less'],
})
export class MissionCardComponent implements OnInit {
  @Input() mission!: Mission;
  isChildrenVisible$: Observable<boolean> = EMPTY;
  children$: Observable<Mission[]> = EMPTY;

  constructor(private store: Store<MissionsState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.children$ = this.store.select(selectMissionChildren(this.mission.id));
    this.isChildrenVisible$ = this.store.select(
      selectIsMissionChildrenDisplayed(this.mission.id)
    );
  }

  toggleChildrenVisibility(): void {
    this.store.dispatch(
      Actions.toggleIsMissionChildrenDisplayed({ missionId: this.mission.id })
    );
  }

  deleteMission(): void {
    this.store.dispatch(Actions.deleteMission({ missionId: this.mission.id }));
  }

  editMission(): void {
    this.dialog.open(MissionModalComponent, {
      hasBackdrop: true,
      data: { isEditMission: true, mission: this.mission },
    });
  }
}
