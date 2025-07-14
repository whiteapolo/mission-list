import { createAction, props } from '@ngrx/store';
import { Mission } from '../types';

export const addMission = createAction('[Mission] add', props<Mission>());
export const deleteMission = createAction(
  '[Mission] delete',
  props<{ missionId: string }>()
);
export const updateMission = createAction(
  '[Mission] update',
  props<{ newMission: Mission }>()
);

export const loadMissions = createAction('[Mission] load');

export const setMissions = createAction(
  '[Mission] set missions',
  props<{ missions: Mission[] }>()
);
