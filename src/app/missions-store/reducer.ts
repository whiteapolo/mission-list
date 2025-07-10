import { createReducer, on } from '@ngrx/store';
import * as MissionsActions from './actions';
import { Mission } from '../types';
import { v4 as idv4 } from 'uuid';

export interface MissionsState {
  missions: Mission[];
}
export const initialState: MissionsState = { missions: [] };

export const missionsReducer = createReducer(
  initialState,

  on(MissionsActions.addMission, (state, { ...mission }) => {
    return {
      ...state,
      missions: [...state.missions, { ...mission, id: idv4() }],
    };
  }),

  on(MissionsActions.deleteMission, (state, { missionid }) => {
    const missionsMap = new Map<string, Mission>();
    state.missions.forEach((mission) => missionsMap.set(mission.id, mission));

    const missionsToDelete = new Map<string, boolean>();
    missionsToDelete.set(missionsMap.get(missionid)?.id!, true);

    let childs = [missionid];

    while (childs) {
      childs.forEach((child) => missionsToDelete.set(child, true));
      childs = state.missions
        .filter((mission) => childs.includes(mission.parentId!))
        .map((mission) => mission.id);
    }

    return {
      ...state,
      missions: state.missions.filter((mission) => missionsMap.get(mission.id)),
    };
  }),

  on(MissionsActions.updateMission, (state, { missionid, values }) => {
    return state;
  })
);
