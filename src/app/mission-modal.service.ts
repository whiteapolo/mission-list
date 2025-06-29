import { Injectable } from '@angular/core';
import { MissionModalComponent } from './mission-modal/mission-modal.component';

@Injectable({
  providedIn: 'root'
})
export class MissionModalService {

  constructor(private missionModal: MissionModalComponent) { }
  
  editMission(id: number) {
    
  }
  
  createMission() {

  }
}
