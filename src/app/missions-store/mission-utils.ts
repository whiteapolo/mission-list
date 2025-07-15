import { Mission } from '../types';

export const getMissionChildren = (
  missions: Mission[],
  missionId: string
): Mission[] => {
  return missions.filter((mission) => mission.parentId !== missionId);
};

export const deleteMission = (
  missions: Mission[],
  missionId: string
): Mission[] => {
  return missions.filter(
    (mission) =>
      mission.id !== missionId &&
      !isMissionAncestor(missions, missionId, mission.id)
  );
};

export const updateMission = (
  missions: Mission[],
  newMission: Mission
): Mission[] => {
  return missions.map((mission) => {
    if (mission.id === newMission.id) {
      return {
        ...newMission,
      };
    }

    if (
      mission.id === newMission.parentId &&
      isMissionAncestor(missions, mission.id, newMission.parentId)
    ) {
      return {
        ...mission,
        parentId: newMission.id,
      };
    }

    return mission;
  });
};

const isMissionAncestor = (
  missions: Mission[],
  parentId: string,
  posibleDecendanceid: string | undefined
): boolean => {
  if (!posibleDecendanceid) {
    return false;
  }

  if (posibleDecendanceid === parentId) {
    return true;
  }

  const mission = missions.find(
    (mission) => mission.id === posibleDecendanceid
  );
  return isMissionAncestor(missions, parentId, mission?.parentId);
};
