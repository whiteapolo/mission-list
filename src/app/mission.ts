import { MissionStatus } from "./mission-status";

export interface Mission {
    id: number;
    title: string; // limit to 50 characters
    status: MissionStatus;
    parent?: Mission | undefined;
    children: Mission[];
}