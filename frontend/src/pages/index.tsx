import { Inter } from "@next/font/google";
import {
  Container,
  Divider,
  Dropdown,
  List,
  Loader,
  Menu,
  Segment,
} from "semantic-ui-react";
import { TimesheetTable } from "@/components/timesheet/TimesheetTable";
import { useQuery } from "react-query";
import { fetchWorkPerformed } from "@/api/work-performed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLoading, error, data, isFetching } = useQuery(
    "get-work-performed",
    () => fetchWorkPerformed()
  );

  return (
    <div>
      <Container text style={{ marginTop: "7em" }}></Container>
    </div>
  );
}
