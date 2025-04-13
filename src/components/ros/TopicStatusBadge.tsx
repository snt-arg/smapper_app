import { Badge } from '@chakra-ui/react'

export default function TopicStatusBadge({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case 'online':
      return (
        <Badge
          fontWeight="semibold"
          colorPalette="green"
          size="sm"
          variant="surface"
        >
          {status}
        </Badge>
      )
    default:
      return (
        <Badge
          fontWeight="semibold"
          colorPalette="gray"
          size="sm"
          variant="surface"
        >
          {status}
        </Badge>
      )
  }
}
