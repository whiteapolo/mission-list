import { createAction, props } from '@ngrx/store';
import { Mission } from '../types';

const addMission = createAction('[Mission] add', props<Mission>());
const deleteMission = createAction(
  '[Mission] delete',
  props<{ missionid: string }>()
);
const updateMission = createAction(
  '[Mission] update',
  props<{ newMission: Mission }>()
);

const loadMissions = createAction('[Mission] load');

const loadMissionsSuccess = createAction(
  '[Mission] loaded success',
  props<{ missions: Mission[] }>()
);

export const missionActions = {
  addMission,
  deleteMission,
  updateMission,
  loadMissions,
  loadMissionsSuccess,
};
