import { createReducer, on } from '@ngrx/store';
import { Mission, MissionStatusFilter } from '../types';
import { v4 as idv4 } from 'uuid';
import * as Actions from './missions-actions';

export interface MissionsState {
  missions: Mission[];
  visibleMissionChildren: Map<string, boolean>;
  searchQuery: string;
  statusFilter: MissionStatusFilter;
}
export const initialState: MissionsState = {
  missions: [],
  visibleMissionChildren: new Map(),
  searchQuery: '',
  statusFilter: MissionStatusFilter.NO_FILTER,
};

export const missionsReducer = createReducer(
  initialState,

  on(Actions.addMission, (state, { mission }) => ({
    ...state,
    missions: state.missions.concat({ ...mission, id: idv4() }),
  })),

  on(Actions.deleteMission, (state, { missionId }) => ({
    ...state,
    missions: state.missions.filter(
      (mission) =>
        mission.id !== missionId &&
        !isMissionAncestor(state.missions, missionId, mission.id)
    ),
  })),

  on(Actions.updateMission, (state, { newMission }) => ({
    ...state,
    missions: updateMission(state.missions, newMission),
  })),

  on(Actions.setMissions, (state, { missions }) => ({
    ...state,
    missions: missions,
  })),

  on(Actions.toggleMissionChildrenVisibility, (state, { missionId }) => {
    return {
      ...state,
      visibleMissionChildren: new Map(state.visibleMissionChildren).set(
        missionId,
        !state.visibleMissionChildren.get(missionId)
      ),
    };
  })
);

export const updateMission = (
  missions: Mission[],
  newMission: Mission
): Mission[] => {
  return missions.map((mission) => {
    if (mission.id === newMission.id) {
      return {
        ...newMission,
      };
    }

    if (
      mission.id === newMission.parentId &&
      isMissionAncestor(missions, newMission.id, newMission.parentId)
    ) {
      return {
        ...mission,
        parentId: missions.find((mission) => mission.id === newMission.id)
          ?.parentId,
      };
    }

    return mission;
  });
};

const isMissionAncestor = (
  missions: Mission[],
  parentId: string,
  posibleDecendanceid: string | undefined
): boolean => {
  if (!posibleDecendanceid || !parentId) {
    return false;
  }

  if (posibleDecendanceid === parentId) {
    return true;
  }

  const mission = missions.find(
    (mission) => mission.id === posibleDecendanceid
  );
  return isMissionAncestor(missions, parentId, mission?.parentId);
};
