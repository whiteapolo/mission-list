import { Injectable } from '@angular/core';
import { Mission } from './types';
import { BehaviorSubject, Observable } from 'rxjs';
import { MISSIONS_LOCAL_STORAGE_KEY } from 'src/app/constants';
import { v4 as idv4 } from 'uuid';

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

  addMission(mission: Mission): void {
    this.missions.push({ ...mission, id: idv4() });
    this.saveMissionsToLocalStorage();
    this.missions$.next(this.missions);
  }

  moveMissionToDescendat(mission: Mission, descendantid: string): void {
    const decendance = this.getMissionByid(descendantid);

    if (!decendance) {
      return;
    }

    const oldparentId = mission.parentId;
    decendance.parentId = oldparentId;
    mission.parentId = decendance.id;
    decendance.isChildrenVisible = mission.isChildrenVisible;
  }

  updateMissionParent(mission: Mission, newparentId: string): void {
    if (this.isMissionAncestor(mission.id, newparentId)) {
      this.moveMissionToDescendat(mission, newparentId);
    } else {
      mission.parentId = newparentId;
    }
  }

  updateMission(mission: Mission, newValues: Mission): void {
    mission.status = newValues.status ?? mission.status;
    mission.name = newValues.name ?? mission.name;

    if (newValues.parentId) {
      this.updateMissionParent(mission, newValues.parentId);
    } else {
      mission.parentId = undefined;
    }

    this.saveMissionsToLocalStorage();
    this.missions$.next(this.missions);
  }

  deleteMissionDescendants(missionid: string): void {
    this.missions
      .filter((mission) => mission.parentId === missionid)
      .forEach((mission) => this.deleteMissionDescendants(mission.id));
    this.missions = this.missions.filter(
      (mission) => mission.parentId !== missionid
    );
  }

  deleteMission(missionid: string): void {
    this.deleteMissionDescendants(missionid);
    this.missions = this.missions.filter((mission) => mission.id !== missionid);
    this.missions$.next(this.missions);
    this.saveMissionsToLocalStorage();
  }

  getMissionChildren(parentId: string): Mission[] {
    return this.missions.filter((mission) => mission.parentId === parentId);
  }

  getMissionByid(id: string): Mission | undefined {
    return this.missions.find((mission) => mission.id === id);
  }

  private isMissionAncestor(
    parentId: string,
    posibleDecendanceid: string | undefined
  ): boolean {
    if (!posibleDecendanceid) {
      return false;
    }

    if (posibleDecendanceid === parentId) {
      return true;
    }

    const mission = this.getMissionByid(posibleDecendanceid);
    return this.isMissionAncestor(parentId, mission?.parentId);
  }

  private saveMissionsToLocalStorage(): void {
    // localStorage.setItem(
    //   MISSIONS_LOCAL_STORAGE_KEY,
    //   JSON.stringify(this.missions)
    // );
  }
}
