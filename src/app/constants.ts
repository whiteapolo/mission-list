import { Mission, MissionStatus } from './types';

export const MISSIONS_LOCAL_STORAGE_KEY = 'missions';

export const EMPTY_MISSION: Mission = {
  name: '',
  status: MissionStatus.ACTIVE,
} as any;
