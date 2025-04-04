import { Table } from "@chakra-ui/react"; // or your preferred UI library
import { TopicSchema } from "@/types/Ros";
import TopicStatusBadge from "./TopicStatusBadge";

export const TopicItem = ({ service: topic }: { service: TopicSchema }) => (
  <Table.Row>
    <Table.Cell>{topic.name}</Table.Cell>
    <Table.Cell hideBelow={"md"}>{topic.msg_type}</Table.Cell>
    <Table.Cell>
      <TopicStatusBadge status={topic.status} />
    </Table.Cell>
    <Table.Cell textAlign="end" >{topic.hz.toFixed(1)}</Table.Cell>
  </Table.Row>
);
