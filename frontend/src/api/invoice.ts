import { Client } from "./client";
import { WorkGroup } from "./work-group";

export interface Invoice {
  id: number;
  allocationDate: Date;
  client: Client;
  completedDate: Date | null;
  workGroups: WorkGroup[];
}
