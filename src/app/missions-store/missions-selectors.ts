import { createSelector } from '@ngrx/store';
import { Mission, MissionStatusFilter } from '../types';

const selectMissionsProperty = (state: any) => {
  return state.app.missions;
};

const selectSearchQueryProprety = (state: any) => {
  return state.app.searchQuery;
};

const selectStatusFilterProprety = (state: any) => {
  return state.app.statusFilter;
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
  (missions: Mission[]) => {
    return missions;
  }
);

export const selectMissionChildrenVisibility = (missionId: string) =>
  createSelector(
    selectMissionChildrenVisibilityProperty,
    (visibleMissionChildren: Map<string, boolean>) =>
      !!visibleMissionChildren.get(missionId)
  );

export const selectSearchQuery = () =>
  createSelector(selectSearchQueryProprety, (query: string) => query);

export const selectStatusFilter = () =>
  createSelector(
    selectStatusFilterProprety,
    (statusFilter: MissionStatusFilter) => statusFilter
  );

export const selectMissionParent = (missionId: string) =>
  createSelector(selectMissionsProperty, (missions: Mission[]) => {
    const mission = missions.find((mission) => mission.id === missionId);
    return mission && missions.find((parent) => parent.id === mission.parentId);
  });
