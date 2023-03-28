import { Invoice } from "./invoice";
import { WorkPerformed } from "./work-performed";
import { WorkType } from "./work-type";

export interface WorkGroup {
  id: number;
  amountChargedPence: number;
  description: string;
  workPerformed: WorkPerformed[];
  workType: WorkType;
  invoice: Invoice | null;
  saved: boolean;
  credited: boolean;
}
