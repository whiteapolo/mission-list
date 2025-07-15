import { createSelector } from '@ngrx/store';
import { Mission } from '../types';

const selectMissionsProperty = (state: any) => {
  return state.app.missions;
};

const selectMissionChildrenVisibilityProperty = (state: any) => {
  return state.app.visibleMissionChildren;
};

export const selectMissionChildren = (missionId: string) =>
  createSelector(selectMissionsProperty, (missions: Mission[]) =>
    missions.filter((mission) => mission.parentId === missionId)
  );

export const selectMissions = createSelector(
  selectMissionsProperty,
  (missions: Mission[]) => missions
);

export const selectMissionChildrenVisibility = (missionId: string) =>
  createSelector(
    selectMissionChildrenVisibilityProperty,
    (visibleMissionChildren: Set<string>) =>
      visibleMissionChildren.has(missionId)
  );
