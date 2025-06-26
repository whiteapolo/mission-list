import { MissionStatus } from "./mission-status";

export interface Mission {
    id: number;
    title: string;
    status: MissionStatus;
    description: string; // limit to 50 characters
    parentMission?: Mission;
    subMissions: Mission[];
}