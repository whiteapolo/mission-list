import { Mission } from '../types';

function getMissionByid(missions: Mission[], id: string): Mission | undefined {
  return missions.find((mission) => mission.id === id);
}

export const getMissionChildren = (missions: Mission[], missionId: string) => {
  return missions.filter((mission) => mission.parentId === missionId);
};

export const deleteMissionFromArray = (
  missions: Mission[],
  missionId: string
): Mission[] => {
  return missions.filter(
    (mission) =>
      mission.id !== missionId ||
      isMissionAncestor(missions, missionId, mission.id)
  );
};

export const updateMission = (
  missions: Mission[],
  newMission: Mission
): Mission[] => {
  return missions.map((m) => {
    if (m.id === newMission.id) {
      return {
        ...newMission,
      };
    }

    if (
      m.id === newMission.parentId &&
      isMissionAncestor(missions, m.id, newMission.parentId)
    ) {
      return {
        ...m,
        parentId: newMission.id,
      };
    }

    return m;
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

  const mission = getMissionByid(missions, posibleDecendanceid);
  return isMissionAncestor(missions, parentId, mission?.parentId);
};
