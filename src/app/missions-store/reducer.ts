import { createReducer, on } from '@ngrx/store';
import { Mission } from '../types';
import { v4 as idv4 } from 'uuid';
import { deleteMission, updateMission } from './mission-utils';
import * as Actions from './actions';

export interface MissionsState {
  missions: Mission[];
}
export const initialState: MissionsState = { missions: [] };

export const missionsReducer = createReducer(
  initialState,

  on(Actions.addMission, (state, { ...mission }) => {
    return {
      ...state,
      missions: [...state.missions, { ...mission, id: idv4() }],
    };
  }),

  on(Actions.deleteMission, (state, { missionId }) => {
    return {
      ...state,
      missions: deleteMission(state.missions, missionId),
    };
  }),

  on(Actions.updateMission, (state, { newMission }) => {
    return { ...state, missions: updateMission(state.missions, newMission) };
  }),

  on(Actions.setMissions, (state, { missions }) => {
    return {
      ...state,
      missions: [...missions],
    };
  })
);
