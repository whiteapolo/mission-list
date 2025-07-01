export interface Mission {
  id: number;
  title: string; // limit to 50 characters
  status: MissionStatus;
  parent?: Mission | undefined;
  children: Mission[];
}

export enum MissionStatus {
  ACTIVE = 'פעיל',
  NOT_ACTIVE = 'לא פעיל',
}
