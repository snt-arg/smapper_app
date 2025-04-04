import { Badge } from "@chakra-ui/react"


export default function TopicStatusBadge({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case ("online"):
      return <Badge fontWeight="semibold" colorPalette="green" size="xs" variant="surface">{status}</Badge>
    default:
      return <Badge fontWeight="semibold" colorPalette="gray" size="xs" variant="surface">{status}</Badge>
  }
}

