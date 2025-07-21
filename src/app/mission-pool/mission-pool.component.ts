import { Component, Input } from '@angular/core';
import { Mission, MissionStatusFilter } from '../types';

@Component({
  selector: 'mission-pool',
  templateUrl: './mission-pool.component.html',
  styleUrls: ['./mission-pool.component.less'],
})
export class MissionPoolComponent {
  @Input() statusFilter: MissionStatusFilter = MissionStatusFilter.NO_FILTER;
  @Input() searchQuery: string = '';
  @Input() missions: Mission[] = [];

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
