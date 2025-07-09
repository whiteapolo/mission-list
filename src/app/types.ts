export interface Mission {
  uuid: string;
  name: string; // limit to 50 characters
  status: MissionStatus;
  parentUuid?: string;
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
