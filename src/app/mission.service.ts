import { Injectable } from '@angular/core';
import { Mission } from './mission';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MISSIONS_KEY } from 'src/constants';

@Injectable({
  providedIn: 'root',
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
    const data = localStorage.getItem(MISSIONS_KEY);

    if (data) {
      this.missions = JSON.parse(data);
      this.missions$.next(this.missions);
      this.nextId = this.calculateMaxId(this.missions) + 1;
    }
  }

  private getMissionById(
    id: number,
    missions?: Mission[]
  ): Mission | undefined {
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

  getMissionsAsFlatArray(): Observable<Mission[]> {
    return this.missions$
      .asObservable()
      .pipe(map((missions: Mission[]) => this.flatMissionsArray(missions)));
  }

  private flatMissionsArray(missions: Mission[]): Mission[] {
    let array: Mission[] = [...missions];

    missions.forEach((mission) => {
      array = array.concat(this.flatMissionsArray(mission.children));
    });

    return array;
  }

  addMission(parent: Mission, mission: Mission) {
    const newMission = {
      ...mission,
      children: [],
      parent: parent,
      id: this.nextId++,
    };

    console.log(
      `created mission with title: ${newMission.title} under ${newMission.parent.title}`
    );

    parent ? parent.children.push(newMission) : this.missions.push(newMission);
    this.writeMissionChanges();
  }

  updateMission(mission: Mission, newParent: Mission) {
    return;
    // if (!newParent && mission.parent) {
    // }

    // if (mission.parent) {
    //   mission.parent.children = mission.parent?.children.filter(
    //     (currMission) => currMission.id !== mission.id
    //   );
    // }

    // newParent?.children.push(mission);
    // this.missions$.next(this.missions);
    // this.writeMissionChanges();
  }

  private removeMissionFromArray(
    missions: Mission[],
    idToRemove: number
  ): boolean {
    const missionIndex = missions.findIndex((mission) => idToRemove);

    if (missionIndex >= 0) {
      missions.splice(missionIndex, 1);
      return true;
    }

    return false;
  }

  deleteMission(missionToRemove: Mission) {
    const isDeleted = this.removeMissionFromArray(
      missionToRemove.parent?.children ?? this.missions,
      missionToRemove.id
    );

    if (!isDeleted) {
      console.log(`mission with id: ${missionToRemove} was not found`);
      return;
    }

    this.missions$.next(this.missions);
    this.writeMissionChanges();
  }

  private writeMissionChanges() {
    // localStorage.setItem(MISSIONS_KEY, JSON.stringify(this.missions));
  }

  private deleteMissionNode(missions: Mission[], id: number): Mission[] {
    return missions.filter((node) => {
      if (node.id === id) {
        console.log(`Deleted mission '${node.title}' with id '${node.id}'`);
        return false;
      }

      node.children = this.deleteMissionNode(node.children, id);
      return true;
    });
  }
}
