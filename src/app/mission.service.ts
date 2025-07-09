import { Injectable } from '@angular/core';
import { Mission } from './types';
import { BehaviorSubject, Observable } from 'rxjs';
import { MISSIONS_LOCAL_STORAGE_KEY } from 'src/app/constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  missions: Mission[] = [];
  missions$ = new BehaviorSubject<Mission[]>(this.missions);

  constructor() {
    const data = localStorage.getItem(MISSIONS_LOCAL_STORAGE_KEY);

    if (data) {
      this.missions = JSON.parse(data);
      this.missions$.next(this.missions);
    }
  }

  getMissions(): Observable<Mission[]> {
    return this.missions$.asObservable();
  }

  addMission(mission: Mission) {
    this.missions.push({ ...mission, uuid: uuidv4() });
    this.saveMissionsToLocalStorage();
    this.missions$.next(this.missions);
  }

  moveMissionToDescendat(mission: Mission, descendantUuid: string) {
    const decendance = this.getMissionByUuid(descendantUuid);

    if (!decendance) {
      return;
    }

    const oldParentUuid = mission.parentUuid;
    decendance.parentUuid = oldParentUuid;
    mission.parentUuid = decendance.uuid;
    decendance.isChildrenVisible = mission.isChildrenVisible;
  }

  updateMissionParent(mission: Mission, newParentUuid: string) {
    if (this.isMissionAncestor(mission.uuid, newParentUuid)) {
      this.moveMissionToDescendat(mission, newParentUuid);
    } else {
      mission.parentUuid = newParentUuid;
    }
  }

  updateMission(mission: Mission, newValues: Mission) {
    mission.status = newValues.status ?? mission.status;
    mission.name = newValues.name ?? mission.name;

    if (newValues.parentUuid) {
      this.updateMissionParent(mission, newValues.parentUuid);
    } else {
      mission.parentUuid = undefined;
    }

    this.saveMissionsToLocalStorage();
    this.missions$.next(this.missions);
  }

  deleteMissionDescendants(missionUuid: string) {
    this.missions
      .filter((mission) => mission.parentUuid === missionUuid)
      .forEach((mission) => this.deleteMissionDescendants(mission.uuid));
    this.missions = this.missions.filter(
      (mission) => mission.parentUuid !== missionUuid
    );
  }

  deleteMission(missionUuid: string) {
    this.deleteMissionDescendants(missionUuid);
    this.missions = this.missions.filter(
      (mission) => mission.uuid !== missionUuid
    );
    this.missions$.next(this.missions);
    this.saveMissionsToLocalStorage();
  }

  getMissionChildren(parentUuid: string): Mission[] {
    return this.missions.filter((mission) => mission.parentUuid === parentUuid);
  }

  getMissionByUuid(uuid: string): Mission | undefined {
    return this.missions.find((mission) => mission.uuid === uuid);
  }

  private isMissionAncestor(
    parentUuid: string,
    posibleDecendanceUuid: string | undefined
  ): boolean {
    if (!posibleDecendanceUuid) {
      return false;
    }

    if (posibleDecendanceUuid === parentUuid) {
      return true;
    }

    const mission = this.getMissionByUuid(posibleDecendanceUuid);
    return this.isMissionAncestor(parentUuid, mission?.parentUuid);
  }

  private saveMissionsToLocalStorage() {
    // localStorage.setItem(
    //   MISSIONS_LOCAL_STORAGE_KEY,
    //   JSON.stringify(this.missions)
    // );
  }
}
