import { Mission, MissionStatus } from './types';

export const MISSIONS_LOCAL_STORAGE_KEY = 'missions';

export const EMPTY_MISSION: Mission = {
  id: 0,
  name: '',
  status: MissionStatus.ACTIVE,
  children: [],
};

export const NEW_MISSION_ROOT = (): Mission => {
  return {
    id: 1,
    name: 'root',
    children: [],
    status: MissionStatus.ACTIVE,
  };
};

export const MISSION_STATUS_TYPES = Object.values(MissionStatus);
