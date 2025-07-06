import { Injectable } from '@angular/core';
import { Mission } from './types';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getMissionsAsFlatArray(): Observable<Mission[]> {
    return this.missions$
      .asObservable()
      .pipe(map((missions: Mission) => this.flatMissionsArray(missions)));
  }

  private flatMissionsArray(root: Mission): Mission[] {
    if (!root) {
      return [];
    }

    const array: Mission[] = [];

    root.children.forEach((child) =>
      array.push(child, ...this.flatMissionsArray(child))
    );

    return array;
  }

  addMission(mission: Mission) {
    const newMission = {
      ...mission,
      children: [],
      id: this.generateNextId(),
    };

    newMission.parent = newMission.parent || this.missionsRoot;
    newMission.parent.children.push(newMission);

    this.writeMissionChanges();

    console.log(
      `created mission with title: ${newMission.title} under ${newMission.parent?.title}`
    );

    this.missions$.next(this.missionsRoot);
    this.writeMissionChanges();
  }

  updateMission(mission: Mission, newValues: Mission) {
    mission.status = newValues.status ?? mission.status;
    mission.title = newValues.title ?? mission.title;

    if (!newValues.parent || mission.parent?.id === newValues.parent?.id) {
      this.missions$.next(this.missionsRoot);
      return;
    }

    if (this.isMissionAncestor(newValues.parent!, mission)) {
      const oldParent = mission.parent!;
      const index = this.removeMissionFromArray(oldParent.children, mission.id);
      let newParent = newValues.parent!;
      this.removeMissionFromArray(newParent.parent!.children, newParent?.id);
      newParent.parent = oldParent;
      newParent?.children.push(mission);
      // oldParent.children.push(newParent);
      oldParent.children.splice(index, 0, newParent);
      mission.parent = newParent;
      newParent.isChildrenVisible = mission.isChildrenVisible;
    } else {
      const oldParent = mission.parent;
      mission.parent = newValues.parent ?? mission.parent;

      this.removeMissionFromArray(
        oldParent?.children ?? this.missionsRoot.children,
        mission.id
      );

      (mission?.parent?.children ?? this.missionsRoot.children).push(mission);
    }

    this.writeMissionChanges();
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
        `mission(title: "${missionToRemove.title}", id: ${missionToRemove.id}) was not found`
      );
      return;
    }

    console.log(
      `mission(title: "${missionToRemove.title}", id: ${missionToRemove.id}) deleted`
    );

    this.missions$.next(this.missionsRoot);
    this.writeMissionChanges();
  }

  private writeMissionChanges() {
    // when converting the missions tree to JSON
    // the parent reference in the mission cause
    // circular refrencing in JSON which is not allowed
    // so we remove the parent reference when converting to JSON
    const replaceUnecesaryKeys = (key: string, value: any) => {
      return key === 'parent' || key == 'isChildrenVisible' ? null : value;
    };
    // localStorage.setItem(
    //   MISSIONS_LOCAL_STORAGE_KEY,
    //   JSON.stringify(this.missionsRoot, parentToNullReplacer)
    // );
    console.log(
      `saved missions in local storage under key: "${MISSIONS_LOCAL_STORAGE_KEY}"`
    );
  }

  private generateNextId() {
    return this.missionsRoot.id++;
  }
}
