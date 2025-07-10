import { createSelector } from '@ngrx/store';
import { MissionsState } from './reducer';
import { Mission } from '../types';

export const selectMissions = (state: MissionsState) => state.missions;

export const missionChildren = (missionUuid: string) =>
  createSelector(selectMissions, (missions: Mission[]) =>
    missions.filter((mission) => mission.parentId === missionUuid)
  );

export const missions = createSelector(
  selectMissions,
  (missions: Mission[]) => missions
);
