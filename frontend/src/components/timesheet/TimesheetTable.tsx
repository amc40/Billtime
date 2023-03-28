import { WorkPerformed } from "@/api/work-performed";
import React from "react";
import { Icon, Table } from "semantic-ui-react";

interface TimesheetTableProps {
  allWorkPerformed: WorkPerformed[];
}

export const TimesheetTable: React.FC<TimesheetTableProps> = ({
  allWorkPerformed,
}) => {
  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell>Staff</Table.HeaderCell>
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Work Type</Table.HeaderCell>
        <Table.HeaderCell>Duration</Table.HeaderCell>
        <Table.HeaderCell>Assigned to Workgroup?</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {allWorkPerformed.map((workPerformed) => (
          <Table.Row key={workPerformed.id}>
            <Table.Cell>{workPerformed.staff.staffNumber}</Table.Cell>
            <Table.Cell>{workPerformed.client.referenceNumber}</Table.Cell>
            <Table.Cell>{workPerformed.workType.workName}</Table.Cell>
            <Table.Cell>{`${workPerformed.durationInMins} mins`}</Table.Cell>
            <Table.Cell>
              {workPerformed.workGroup != null ? (
                <Icon color="green" name="checkmark" size="large" />
              ) : (
                <Icon color="red" name="cancel" size="large" />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
