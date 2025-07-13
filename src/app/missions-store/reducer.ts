import { createReducer, on } from '@ngrx/store';
import { missionActions } from './actions';
import { Mission } from '../types';
import { v4 as idv4 } from 'uuid';
import { deleteMissionFromArray, updateMission } from './mission-utils';

export interface MissionsState {
  missions: Mission[];
}
export const initialState: MissionsState = { missions: [] };

export const missionsReducer = createReducer(
  initialState,

  on(missionActions.addMission, (state, { ...mission }) => {
    return {
      ...state,
      missions: [...state.missions, { ...mission, id: idv4() }],
    };
  }),

  on(missionActions.deleteMission, (state, { missionid }) => {
    return {
      ...state,
      missions: deleteMissionFromArray(state.missions, missionid),
    };
  }),

  on(missionActions.updateMission, (state, { newMission }) => {
    return { ...state, missions: updateMission(state.missions, newMission) };
  }),

  on(missionActions.loadMissionsSuccess, (state, { missions }) => {
    return {
      ...state,
      missions: [...missions],
    };
  })
);
