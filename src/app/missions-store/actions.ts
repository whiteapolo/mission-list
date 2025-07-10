import { createAction, props } from '@ngrx/store';
import { Mission } from '../types';

export const addMission = createAction('[Mission] add', props<Mission>());
export const deleteMission = createAction(
  '[Mission] delete',
  props<{ missionUuid: string }>()
);
export const updateMission = createAction('[Mission] update');
export const getMissionChildren = createAction('[Mission] children');
