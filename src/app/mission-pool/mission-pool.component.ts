import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../types';
import { MissionsState } from '../missions-store/reducer';
import { Store } from '@ngrx/store';
import { selectMissions } from '../missions-store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'mission-pool',
  templateUrl: './mission-pool.component.html',
  styleUrls: ['./mission-pool.component.less'],
})
export class MissionPoolComponent {
  @Input() shouldShowMission: (mission: Mission) => boolean = () => true;
  missions$: Observable<Mission[]>;

  constructor(private store: Store<MissionsState>) {
    this.missions$ = this.store.select(selectMissions);
  }
}
