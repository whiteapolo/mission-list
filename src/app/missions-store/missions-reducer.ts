import { createReducer, on } from '@ngrx/store';
import { Mission, MissionStatusFilter } from '../types';
import { v4 as idv4 } from 'uuid';
import { deleteMission, updateMission } from './mission-utils';
import * as Actions from './missions-actions';

export interface MissionsState {
  missions: Mission[];
  visibleMissionChildren: Set<string>;
  searchQuery: string;
  statusFilter: MissionStatusFilter;
}
export const initialState: MissionsState = {
  missions: [],
  visibleMissionChildren: new Set(),
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
    missions: deleteMission(state.missions, missionId),
  })),

  on(Actions.updateMission, (state, { newMission }) => ({
    ...state,
    missions: updateMission(state.missions, newMission),
  })),

  on(Actions.setMissions, (state, payload) => ({
    ...state,
    missions: payload.missions,
  })),

  on(Actions.setMissionChildrenVisible, (state, { missionId }) => ({
    ...state,
    visibleMissionChildren: new Set([
      ...state.visibleMissionChildren,
      missionId,
    ]),
  })),

  on(Actions.setMissionChildrenInvisible, (state, { missionId }) => ({
    ...state,
    visibleMissionChildren: new Set(
      [...state.visibleMissionChildren].filter((id) => id !== missionId)
    ),
  })),

  on(Actions.toggleMissionChildrenVisibility, (state, { missionId }) => ({
    ...state,
    visibleMissionChildren: new Set(
      state.visibleMissionChildren.has(missionId)
        ? [...state.visibleMissionChildren].filter((id) => id !== missionId)
        : [...state.visibleMissionChildren, missionId]
    ),
  }))
);
