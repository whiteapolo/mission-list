import { Mission } from "./mission"

export const MISSIONS: Mission[] = [
  {
    "id": 1,
    "title": "משימת אב",
    "status": false,
    "description": "זוהי משימה ראשית עם משימות משנה",
    "subMissions": [
      {
        "id": 2,
        "title": "איסוף מידע",
        "status": false,
        "description": "לאסוף מידע על היעד המבוקש",
        "parentMission": {
          "id": 1,
          "title": "משימת אב",
          "status": false,
          "description": "זוהי משימה ראשית עם משימות משנה",
          "subMissions": []
        },
        "subMissions": []
      },
      {
        "id": 3,
        "title": "תכנון פעולה",
        "status": true,
        "description": "לתכנן את שלבי הפעולה בצורה מסודרת",
        "parentMission": {
          "id": 1,
          "title": "משימת אב",
          "status": false,
          "description": "זוהי משימה ראשית עם משימות משנה",
          "subMissions": []
        },
        "subMissions": [
          {
            "id": 4,
            "title": "חלוקת תפקידים",
            "status": false,
            "description": "למנות משימות לפי תחומי אחריות",
            "parentMission": {
              "id": 3,
              "title": "תכנון פעולה",
              "status": true,
              "description": "לתכנן את שלבי הפעולה בצורה מסודרת",
              "subMissions": []
            },
            "subMissions": []
          }
        ]
      }
    ]
  }
]