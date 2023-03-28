import { fetchWorkPerformed } from "@/api/work-performed";
import { TimesheetTable } from "@/components/timesheet/TimesheetTable";
import React from "react";
import { useQuery } from "react-query";
import { Label, Loader, Table } from "semantic-ui-react";

interface TimesheetProps {}

const Timesheet: React.FC<TimesheetProps> = ({}) => {
  const { isLoading, error, data, isFetching } = useQuery(
    "get-work-performed",
    () => fetchWorkPerformed()
  );
  return (
    <>
      <Loader active={isLoading} />
      {!isLoading && <TimesheetTable allWorkPerformed={data ?? []} />}
    </>
  );
};

export default Timesheet;
