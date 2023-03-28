// TODO: fill in
type StaffType = "ACCOUNTANT";

export interface Staff {
  staffNumber: number;
  staffType: StaffType;
  hourlyRatePence: number;
  firstName: string;
  middleNames: string | null;
  surname: string;
}
