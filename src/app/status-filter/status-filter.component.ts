import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MissionStatusFilter } from '../types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.less'],
})
export class StatusFilterComponent {
  missionStatusFilterTypes = Object.values(MissionStatusFilter);
  @Input() control!: FormControl;
}
