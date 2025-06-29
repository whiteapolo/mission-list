import { Injectable } from '@angular/core';
import { Mission } from './mission';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  
  missions: Mission[] = [];
  missions$ = new BehaviorSubject<Mission[]>(this.missions);
  nextId: number = 1;
  
  calculateMaxId(missions: Mission[]): number {
    return missions.reduce((max, curr) => {
        return Math.max(curr.id, max, this.calculateMaxId(curr.children));
    }, 0);
  }

  constructor() {
    
    const data = localStorage.getItem("missions");
    
    if (data) {
      this.missions = JSON.parse(data);
      this.missions$.next(this.missions);
      this.nextId = this.calculateMaxId(this.missions) + 1;
    }
  }
  
  private getMissionById(id: number, missions?: Mission[]): Mission | undefined {
    if (!missions) {
      return this.getMissionById(id, this.missions);
    }
    
    for (const mission of missions) {
      if (mission.id == id) return mission;
      const ret = this.getMissionById(id, mission.children);
      if (ret) return ret;
    }

    return undefined;
  }

  getMissions(): Observable<Mission[]> {
    return this.missions$.asObservable();
  }
  
  createMission(mission: Mission, parentId: number) {
    mission.id = this.nextId++;
    mission.parent = parentId ? this.getMissionById(parentId) : undefined;
    mission.parent?.children.push(mission);
    this.missions$.next(this.missions);
  }
  
  updateMission(mission: Mission, parentId: number) {
    const newParent = this.getMissionById(parentId);

    if (mission.parent) {
      mission.parent.children = 
          mission.parent?.children.filter(currMission => currMission.id !== mission.id);
    }
    
    newParent?.children.push(mission);
    this.missions$.next(this.missions);
  }
  
  deleteMissionById(id: number) {
      this.missions = this.deleteMissionNode(this.missions, id);
      this.missions$.next(this.missions);
  }
  
  private deleteMissionNode(missions: Mission[], id: number): Mission[] {
    return missions.filter(node => {
      if (node.id === id) {
        console.log(`Deleted mission '${node.title}' with id '${node.id}'`);
        return false;
      }
      
      node.children = this.deleteMissionNode(node.children, id);
      return true;
    });
  }
}