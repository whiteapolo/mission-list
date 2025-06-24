import { Mission } from "./mission"

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "משימת אב",
    status: false,
    description: "זוהי משימה ראשית עם משימות משנה",
    subMissions: [
      {
        id: 2,
        title: "איסוף מידע",
        status: false,
        description: "לאסוף מידע על היעד המבוקש",
        parentMission: {
          id: 1,
          title: "משימת אב",
          status: false,
          description: "זוהי משימה ראשית עם משימות משנה",
          subMissions: []
        },
        subMissions: []
      },
      {
        id: 3,
        title: "תכנון פעולה",
        status: true,
        description: "לתכנן את שלבי הפעולה בצורה מסודרת",
        parentMission: {
          id: 1,
          title: "משימת אב",
          status: false,
          description: "זוהי משימה ראשית עם משימות משנה",
          subMissions: []
        },
        subMissions: [
          {
            id: 4,
            title: "חלוקת תפקידים",
            status: false,
            description: "למנות משימות לפי תחומי אחריות",
            parentMission: {
              id: 3,
              title: "תכנון פעולה",
              status: true,
              description: "לתכנן את שלבי הפעולה בצורה מסודרת",
              subMissions: []
            },
            subMissions: []
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "הקמת צוות",
    status: false,
    description: "לבחור משתתפים לפרויקט",
    subMissions: [
      {
        id: 6,
        title: "ריאיונות",
        status: false,
        description: "לערוך ראיונות למועמדים",
        parentMission: {
          id: 5,
          title: "הקמת צוות",
          status: false,
          description: "לבחור משתתפים לפרויקט",
          subMissions: []
        },
        subMissions: []
      }
    ]
  },
  {
    id: 7,
    title: "הערכת סיכונים",
    status: false,
    description: "לבחון את הסיכונים האפשריים",
    subMissions: []
  },
  {
    id: 8,
    title: "ביצוע הפעולה",
    status: false,
    description: "השלב הסופי לביצוע הפעולה",
    subMissions: [
      {
        id: 9,
        title: "בדיקות אחרונות",
        status: false,
        description: "לוודא הכל מוכן לביצוע",
        parentMission: {
          id: 8,
          title: "ביצוע הפעולה",
          status: false,
          description: "השלב הסופי לביצוע הפעולה",
          subMissions: []
        },
        subMissions: [
          {
            id: 10,
            title: "אישור סופי",
            status: false,
            description: "לקבל אישור סופי מהמנהלים",
            parentMission: {
              id: 9,
              title: "בדיקות אחרונות",
              status: false,
              description: "לוודא הכל מוכן לביצוע",
              subMissions: []
            },
            subMissions: []
          }
        ]
      }
    ]
  }
];