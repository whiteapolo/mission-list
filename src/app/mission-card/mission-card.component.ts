import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../mission';

@Component({
  selector: 'mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.less']
})
export class MissionCardComponent implements OnInit {
  
  @Input() mission!: Mission;

  constructor() { }

  ngOnInit(): void {
  }

}
