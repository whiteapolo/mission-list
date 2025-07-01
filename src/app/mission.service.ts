import { Injectable } from '@angular/core';
import { Mission } from './types';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MISSIONS_KEY } from 'src/app/constants';

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

  addMission(mission: Mission) {
    const newMission = {
      ...mission,
      children: [],
      id: this.nextId++,
    };

    console.log(
      `created mission with title: ${newMission.title} under ${newMission.parent?.title}`
    );

    newMission.parent
      ? newMission.parent.children.push(newMission)
      : this.missions.push(newMission);
    this.writeMissionChanges();
  }

  updateMission(mission: Mission, newValues: Mission) {
    mission.status = newValues.status ?? mission.status;
    mission.title = newValues.title ?? mission.title;

    if (
      newValues?.parent?.id !== mission.parent?.id &&
      mission.id !== newValues.parent?.id
    ) {
      const oldParent = mission.parent;
      mission.parent = newValues.parent ?? mission.parent;

      this.removeMissionFromArray(
        oldParent?.children ?? this.missions,
        mission.id
      );

      (mission?.parent?.children ?? this.missions).push(mission);
    }
  }

  // private isMissionAncestor(mission: Mission, missionToCheck: Mission) {}

  private removeMissionFromArray(
    missions: Mission[],
    idToRemove: number
  ): boolean {
    const missionIndex = missions.findIndex(
      (mission) => mission.id == idToRemove
    );

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
