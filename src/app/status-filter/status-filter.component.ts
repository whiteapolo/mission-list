import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MissionStatusFilter } from '../types';

@Component({
  selector: 'status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.less'],
})
export class StatusFilterComponent {
  missionStatusFilterTypes = Object.values(MissionStatusFilter);
  DEFAULT_STATUS_FILTER = MissionStatusFilter.NO_FILTER;
  @Output() change = new EventEmitter<MissionStatusFilter>();

  statusFilterChange(event: MatSelectChange): void {
    this.change.emit(event.value);
  }
}
