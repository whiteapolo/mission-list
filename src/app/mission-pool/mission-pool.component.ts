import { Component, Input, OnInit } from '@angular/core';
import { Mission, MissionStatusFilter } from '../types';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MissionsState } from '../missions-store/missions-reducer';
import { selectMissions } from '../missions-store/missions-selectors';

@Component({
  selector: 'mission-pool',
  templateUrl: './mission-pool.component.html',
  styleUrls: ['./mission-pool.component.less'],
})
export class MissionPoolComponent implements OnInit {
  @Input() statusFilter: MissionStatusFilter = MissionStatusFilter.NO_FILTER;
  @Input() searchQuery: string = '';
  missions$: Observable<Mission[]> = EMPTY;

  constructor(private store: Store<MissionsState>) {}

  ngOnInit(): void {
    this.missions$ = this.store.select(selectMissions);
  }

  shouldShowMission(mission: Mission) {
    if (mission.parentId) {
      return true;
    }

    if (!mission.name.includes(this.searchQuery || '')) {
      return false;
    }

    if (this.statusFilter === MissionStatusFilter.NO_FILTER) {
      return true;
    }

    return (mission.status as string) === this.statusFilter;
  }
}
