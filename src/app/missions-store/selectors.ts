import { createSelector } from '@ngrx/store';
import { MissionsState } from './reducer';
import { Mission } from '../types';

const selectMissions = (state: MissionsState) => state.missions;

const missionChildren = (missionId: string) =>
  createSelector(selectMissions, (missions: Mission[]) =>
    missions.filter((mission) => mission.parentId === missionId)
  );

const missions = createSelector(
  selectMissions,
  (missions: Mission[]) => missions
);

export const selectors = {
  missionChildren,
  missions,
};
