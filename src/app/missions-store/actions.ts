import { createAction, props } from '@ngrx/store';
import { Mission } from '../types';

export const addMission = createAction(
  '[Mission] add',
  props<{ mission: Mission }>()
);
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

export const setMissionChildrenVisible = createAction(
  '[Mission] set children visible',
  props<{ missionId: string }>()
);

export const setMissionChildrenInvisible = createAction(
  '[Mission] set children invisible',
  props<{ missionId: string }>()
);

export const toggleMissionChildrenVisibility = createAction(
  '[Mission] toggle children invisible',
  props<{ missionId: string }>()
);
