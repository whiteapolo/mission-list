import { Mission, MissionStatus } from './types';

export const MISSIONS_KEY = 'missions';

export const EMPTY_MISSION: Mission = {
  id: 0,
  title: '',
  status: MissionStatus.ACTIVE,
  children: [],
};

export const MISSION_STATUS_TYPES = Object.values(MissionStatus);
