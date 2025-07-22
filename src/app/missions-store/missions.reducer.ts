import { createReducer, on } from '@ngrx/store';
import { Mission, MissionStatusFilter } from '../types';
import { v4 as idv4 } from 'uuid';
import * as Actions from './missions.actions';

export interface MissionsState {
  missions: Mission[];
  isMissionChildrenDisplayed: Map<string, boolean>;
  searchQuery: string;
  statusFilter: MissionStatusFilter;
}
export const initialState: MissionsState = {
  missions: [],
  isMissionChildrenDisplayed: new Map(),
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

  on(Actions.updateMission, (state, { newMission }) => {
    const newVisibleMissionChildren = new Map(state.isMissionChildrenDisplayed);

    if (newMission.parentId) {
      newVisibleMissionChildren.set(
        newMission.parentId,
        !!state.isMissionChildrenDisplayed.get(newMission.id)
      );
    }
    return {
      ...state,
      missions: updateMission(state.missions, newMission),
      isMissionChildrenDisplayed: newVisibleMissionChildren,
    };
  }),

  on(Actions.setMissions, (state, { missions }) => ({
    ...state,
    missions: missions,
  })),

  on(Actions.toggleIsMissionChildrenDisplayed, (state, { missionId }) => {
    const newVisibleMissionChildren = new Map(state.isMissionChildrenDisplayed);

    newVisibleMissionChildren.set(
      missionId,
      !state.isMissionChildrenDisplayed.get(missionId)
    );

    return {
      ...state,
      isMissionChildrenDisplayed: newVisibleMissionChildren,
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
