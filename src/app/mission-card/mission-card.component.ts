import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../mission';

@Component({
  selector: 'mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.less']
})
export class MissionCardComponent implements OnInit {
  
  @Input() mission!: Mission;
  
  isSubMissionsVisible: boolean = true;
  
  toggleSubMissionsVisibility = () => {
    this.isSubMissionsVisible = !this.isSubMissionsVisible;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
