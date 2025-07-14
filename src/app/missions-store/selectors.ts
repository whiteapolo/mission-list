import { createSelector } from '@ngrx/store';
import { MissionsState } from './reducer';
import { Mission } from '../types';

const selectMissionsProperty = (state: MissionsState) => state.missions;

const selectMissionChildren = (missionId: string) =>
  createSelector(selectMissionsProperty, (missions: Mission[]) =>
    missions.filter((mission) => mission.parentId === missionId)
  );

export const selectMissions = createSelector(
  selectMissionsProperty,
  (missions: Mission[]) => missions
);
