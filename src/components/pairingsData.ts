export interface Pairing {
  id: string;
  mentor: string;
  mentee: string;
  interests: string;
  availability: string;
  matched: boolean;
  matchedDate?: string;
  lastMeeting?: string;
}

export const INITIAL_PAIRINGS: Pairing[] = [
  {
    id: "1",
    mentor: "JANE",
    mentee: "JOHN",
    interests: "CAREER PLANNING",
    availability: "MON · 5PM–8PM",
    matched: true,
    matchedDate: "2 NOV 2026",
    lastMeeting: "16 NOV 2026",
  },
  {
    id: "2",
    mentor: "SARAH",
    mentee: "ALEX",
    interests: "STEM, CONFIDENCE",
    availability: "TUE · 12PM–5PM",
    matched: false,
  },
  {
    id: "3",
    mentor: "DAVID",
    mentee: "MAYA",
    interests: "CREATIVE ARTS",
    availability: "WED · 5PM–8PM",
    matched: false,
  },
  {
    id: "4",
    mentor: "EMILY",
    mentee: "LUCAS",
    interests: "COLLEGE READINESS",
    availability: "THU · 12PM–5PM",
    matched: true,
    matchedDate: "5 NOV 2026",
    lastMeeting: "19 NOV 2026",
  },
  {
    id: "5",
    mentor: "MICHAEL",
    mentee: "CHLOE",
    interests: "LEADERSHIP",
    availability: "SAT · 7AM–12PM",
    matched: false,
  },
  {
    id: "6",
    mentor: "RACHEL",
    mentee: "ETHAN",
    interests: "WRITING, WELLBEING",
    availability: "SUN · 12PM–5PM",
    matched: true,
    matchedDate: "1 NOV 2026",
    lastMeeting: "15 NOV 2026",
  },
];