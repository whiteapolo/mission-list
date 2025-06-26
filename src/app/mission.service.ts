import { Injectable } from '@angular/core';
import { Mission } from './mission';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  
  missions: Mission[] = [];
  missions$ = new BehaviorSubject<Mission[]>(this.missions);
  
  getMissions = (): Observable<Mission[]> => {
    return this.missions$.asObservable();
  }
  
  deleteMissionById = (id: number) => {
      this.missions = this.deleteMissionNode(this.missions, id);
      this.missions$.next(this.missions);
  }

  private deleteMissionNode = (missions: Mission[], id: number): Mission[] => {
    return missions.filter(node => {
      if (node.id === id) {
        console.log(`Deleted mission '${node.title}' with id '${node.id}'`);
        return false;
      }
      
      node.subMissions = this.deleteMissionNode(node.subMissions, id);
      return true;
    });
  }

  constructor() {
    
    const data = localStorage.getItem("missions");
    
    if (data) {
      this.missions = JSON.parse(data);
      this.missions$.next(this.missions);
    }
  }
}