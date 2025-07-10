export interface Mission {
  id: string;
  name: string; // limit to 50 characters
  status: MissionStatus;
  parentId?: string;
  isChildrenVisible?: boolean;
}

export enum MissionStatus {
  ACTIVE = 'פעיל',
  NOT_ACTIVE = 'לא פעיל',
}

export const MissionStatusFilter = {
  NO_FILTER: 'ללא סינון',
  ...MissionStatus,
};
