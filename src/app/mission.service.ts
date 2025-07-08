import { Injectable } from '@angular/core';
import { Mission } from './types';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  EMPTY_MISSION,
  MISSIONS_LOCAL_STORAGE_KEY,
  NEW_MISSION_ROOT,
} from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  missionsRoot: Mission = EMPTY_MISSION;
  missions$ = new BehaviorSubject<Mission>(this.missionsRoot);

  constructor() {
    const data = localStorage.getItem(MISSIONS_LOCAL_STORAGE_KEY);

    if (!data) {
      this.missionsRoot = NEW_MISSION_ROOT();
    } else {
      this.missionsRoot = JSON.parse(data);
      this.initMissionsParent(this.missionsRoot);
      this.missions$.next(this.missionsRoot);
    }
  }

  // JSON representation doesn't keep parent reference
  private initMissionsParent(root: Mission) {
    root.children.forEach((child) => {
      child.parent = root;
      this.initMissionsParent(child);
    });
  }

  getMissions(): Observable<Mission> {
    return this.missions$.asObservable();
  }

  addMission(mission: Mission) {
    const newMission = {
      ...mission,
      children: [],
      id: this.generateNextId(),
    };

    newMission.parent = newMission.parent ?? this.missionsRoot;
    newMission.parent.children.push(newMission);

    this.saveMissions();
    this.missions$.next(this.missionsRoot);

    console.log(
      `created mission with name: ${newMission.name} under ${newMission.parent?.name}`
    );
  }

  private moveMissionToAncestor(mission: Mission, ancestor: Mission) {
    const oldParent = mission.parent!;
    const missionIndex = this.removeMissionFromArray(
      oldParent.children,
      mission.id
    );
    this.removeMissionFromArray(ancestor.parent!.children, ancestor?.id);
    ancestor.parent = oldParent;
    ancestor?.children.push(mission);
    oldParent.children.splice(missionIndex, 0, ancestor);
    mission.parent = ancestor;
    ancestor.isChildrenVisible = mission.isChildrenVisible;
  }

  private updateMissionParent(mission: Mission, newParent: Mission) {
    if (this.isMissionAncestor(newParent, mission)) {
      this.moveMissionToAncestor(mission, newParent);
    } else {
      const oldParent = mission.parent;
      mission.parent = newParent;
      this.removeMissionFromArray(oldParent?.children!, mission.id);
      mission?.parent?.children.push(mission);
    }
  }

  updateMission(mission: Mission, newValues: Mission) {
    mission.status = newValues.status ?? mission.status;
    mission.name = newValues.name ?? mission.name;

    if (newValues.parent && mission.parent?.id !== newValues.parent?.id) {
      this.updateMissionParent(mission, newValues.parent);
    }

    this.saveMissions();
    this.missions$.next(this.missionsRoot);
  }

  private isMissionAncestor(
    mission: Mission | undefined,
    possibleAncestor: Mission
  ): boolean {
    return (
      !!mission &&
      (mission.id === possibleAncestor.id ||
        this.isMissionAncestor(mission.parent, possibleAncestor))
    );
  }

  private removeMissionFromArray(
    missions: Mission[],
    idToRemove: number
  ): number {
    const missionIndex = missions.findIndex(
      (mission) => mission.id == idToRemove
    );

    if (missionIndex >= 0) {
      missions.splice(missionIndex, 1);
    }

    return missionIndex;
  }

  deleteMission(missionToRemove: Mission) {
    const parent = missionToRemove.parent!;
    const numOfChildren = parent.children.length;
    parent.children = parent.children.filter(
      (mission) => mission.id !== missionToRemove.id
    );

    if (numOfChildren === parent.children.length) {
      console.error(
        `mission(name: "${missionToRemove.name}", id: ${missionToRemove.id}) was not found`
      );
      return;
    }

    console.log(
      `mission(name: "${missionToRemove.name}", id: ${missionToRemove.id}) deleted`
    );

    this.saveMissions();
    this.missions$.next(this.missionsRoot);
  }

  private saveMissions() {
    const removeKeys = (keys: string[]) => (key: string, value: any) =>
      keys.includes(key) ? null : value;

    // when converting the missions tree to JSON
    // the parent reference in the mission cause
    // circular refrencing in JSON which is not allowed
    // so we remove the parent reference when converting to JSON
    // localStorage.setItem(
    //   MISSIONS_LOCAL_STORAGE_KEY,
    //   JSON.stringify(
    //     this.missionsRoot,
    //     removeKeys(['parent', 'isChildrenVisible'])
    //   )
    // );
    console.log(
      `saved missions in local storage under key: "${MISSIONS_LOCAL_STORAGE_KEY}"`
    );
  }

  private generateNextId() {
    return this.missionsRoot.id++;
  }
}
