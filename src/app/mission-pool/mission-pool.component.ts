import { Component, Input } from '@angular/core';
import { Mission } from '../types';

@Component({
  selector: 'mission-pool',
  templateUrl: './mission-pool.component.html',
  styleUrls: ['./mission-pool.component.less'],
})
export class MissionPoolComponent {
  @Input() shouldShowMission: (mission: Mission) => boolean = () => true;
  @Input() missions: Mission[] = [];
}
