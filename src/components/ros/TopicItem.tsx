import { Table } from "@chakra-ui/react"; // or your preferred UI library
import { TopicSchema } from "@/types/Ros";
import TopicStatusBadge from "./TopicStatusBadge";

export const TopicItem = ({ service: topic }: { service: TopicSchema }) => (
  <Table.Row>
    <Table.Cell bg={{ base: "gray.200", _dark: "gray.600" }}>{topic.name}</Table.Cell>
    <Table.Cell hideBelow={"md"} bg={{ base: "gray.200", _dark: "gray.600" }}>{topic.msg_type}</Table.Cell>
    <Table.Cell bg={{ base: "gray.200", _dark: "gray.600" }}>
      <TopicStatusBadge status={topic.status} />
    </Table.Cell>
    <Table.Cell bg={{ base: "gray.200", _dark: "gray.600" }}>{topic.hz.toFixed(1)}</Table.Cell>
  </Table.Row>
);
