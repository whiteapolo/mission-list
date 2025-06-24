export interface Mission {
    id: number;
    title: string;
    status: boolean;
    description: string; // limit to 50 characters
    parentMission?: Mission;
    subMissions: Mission[];
}