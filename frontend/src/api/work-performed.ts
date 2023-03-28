import { apiAxios } from ".";
import { Client } from "./client";
import { Staff } from "./staff";
import { WorkGroup } from "./work-group";
import { WorkType } from "./work-type";

export interface WorkPerformed {
  id: number;
  staff: Staff;
  client: Client;
  workType: WorkType;
  durationInMins: number;
  workGroup: WorkGroup | null;
}

type WorkPerformedResponse = WorkPerformed[];

export const fetchWorkPerformed = async () => {
  return (await apiAxios.get<WorkPerformedResponse>("work-performed")).data;
};
