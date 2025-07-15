export interface Mission {
  id: string;
  name: string; // limit to 50 characters
  status: MissionStatus;
  parentId?: string;
}

export enum MissionStatus {
  ACTIVE = 'פעיל',
  NOT_ACTIVE = 'לא פעיל',
}

export enum MissionStatusFilter {
  NO_FILTER = 'ללא סינון',
  ACTIVE = 'פעיל',
  NOT_ACTIVE = 'לא פעיל',
}
