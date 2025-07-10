import { createReducer, on } from '@ngrx/store';
import * as MissionsActions from './actions';
import { Mission } from '../types';
import { v4 as uuidv4 } from 'uuid';

export interface MissionsState {
  missions: Mission[];
}
export const initialState: MissionsState = { missions: [] };

export const missionsReducer = createReducer(
  initialState,

  on(MissionsActions.addMission, (state, { ...mission }) => {
    return {
      ...state,
      missions: [...state.missions, { ...mission, uuid: uuidv4() }],
    };
  }),

  on(MissionsActions.deleteMission, (state, { missionUuid }) => {
    const missionsMap = new Map<string, Mission>();
    state.missions.forEach((mission) => missionsMap.set(mission.uuid, mission));

    const missionsToDelete = new Map<string, boolean>();
    missionsToDelete.set(missionsMap.get(missionUuid)?.uuid!, true);

    let childs = [missionUuid];

    while (childs) {
      childs.forEach((child) => missionsToDelete.set(child, true));
      childs = state.missions
        .filter((mission) => childs.includes(mission.parentUuid!))
        .map((mission) => mission.uuid);
    }

    return {
      ...state,
      missions: state.missions.filter((mission) =>
        missionsMap.get(mission.uuid)
      ),
    };
  }),

  on(MissionsActions.updateMission, (state, { missionUuid, values }) => {
    return state;
  })
);
