import { Injectable } from '@angular/core';
import { Mission } from './types';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_MISSION, MISSIONS_KEY } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  missionsRoot: Mission = EMPTY_MISSION;
  missions$ = new BehaviorSubject<Mission>(this.missionsRoot);
  nextId: number = 1;

  calculateMaxId(root: Mission): number {
    return root.children.reduce((max, curr) => {
      return Math.max(curr.id, max, this.calculateMaxId(curr));
    }, 0);
  }

  constructor() {
    const data = localStorage.getItem(MISSIONS_KEY);

    if (data) {
      this.missionsRoot = JSON.parse(data);
      this.missions$.next(this.missionsRoot);
      this.nextId = this.calculateMaxId(this.missionsRoot) + 1;
    }
  }

  getMissions(): Observable<Mission> {
    return this.missions$.asObservable();
  }

  getMissionsAsFlatArray(): Observable<Mission[]> {
    return this.missions$
      .asObservable()
      .pipe(map((missions: Mission) => this.flatMissionsArray(missions)));
  }

  private flatMissionsArray(root: Mission): Mission[] {
    if (!root) {
      return [];
    }

    const array = [root];

    root.children.forEach((child) =>
      array.push(...this.flatMissionsArray(child))
    );

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
      : this.missionsRoot.children.push(newMission);
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
        oldParent?.children ?? this.missionsRoot.children,
        mission.id
      );

      (mission?.parent?.children ?? this.missionsRoot.children).push(mission);
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
      missionToRemove.parent?.children ?? this.missionsRoot.children,
      missionToRemove.id
    );

    if (!isDeleted) {
      console.log(`mission with id: ${missionToRemove} was not found`);
      return;
    }

    this.missions$.next(this.missionsRoot);
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
