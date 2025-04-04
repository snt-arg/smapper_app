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
      <Table.Root >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader bg={{ base: "gray.400", _dark: "gray.900" }}>Name</Table.ColumnHeader>
            <Table.ColumnHeader hideBelow={"md"} bg={{ base: "gray.400", _dark: "gray.900" }}>Type</Table.ColumnHeader>
            <Table.ColumnHeader bg={{ base: "gray.400", _dark: "gray.900" }}>Status</Table.ColumnHeader>
            <Table.ColumnHeader bg={{ base: "gray.400", _dark: "gray.900" }}>Hz</Table.ColumnHeader>
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
