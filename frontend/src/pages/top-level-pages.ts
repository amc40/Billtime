export interface Page {
  name: string;
  path: string;
}

export const topLevelPages: Page[] = [
  {
    name: "timesheet",
    path: "/timesheet",
  },
  {
    name: "client-details",
    path: "/client-details",
  },
];
