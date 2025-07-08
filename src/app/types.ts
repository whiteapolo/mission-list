export interface Mission {
  id: number;
  name: string; // limit to 50 characters
  status: MissionStatus;
  parent?: Mission;
  children: Mission[];
  isChildrenVisible?: boolean;
}

export enum MissionStatus {
  ACTIVE = 'פעיל',
  NOT_ACTIVE = 'לא פעיל',
}
