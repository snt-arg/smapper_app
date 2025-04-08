import Widget from "@/components/Widget"; // Assuming Widget is your UI container
import { Table } from "@chakra-ui/react"; // Assume this component displays the list
import { ErrorMessage } from "@/components/ErrorMessage"; // The error component
import { useTopics } from "@/hooks/useTopics";
import { TopicItem } from "./TopicItem";

export default function TopicDashboard() {
  const { topics, error } = useTopics();

  if (error) {
    return (
      <Widget title="Services">
        <ErrorMessage message={error} />
      </Widget>
    );
  }

  return (
    <Widget title="Topics Monitor">
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader hideBelow={"md"}>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader hideBelow={"md"}>Subs</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Hz</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {topics.map((service, idx) => (
            <TopicItem key={idx} service={service} />
          ))}
        </Table.Body>
      </Table.Root>
    </Widget>
  );
}
