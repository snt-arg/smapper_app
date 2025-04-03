import { Badge } from "@chakra-ui/react"


export default function ServiceStatusBadge({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case ("active"):
      return <Badge fontWeight="semibold" colorPalette="green" size="md" variant="surface">Active</Badge>
    case ("failure"):
      return <Badge fontWeight="semibold" colorPalette="red" size="md" variant="surface">Failure</Badge>
    case ("terminated"):
      return <Badge fontWeight="semibold" colorPalette="yellow" size="md" variant="surface">Terminated</Badge>
    default:
      return <Badge fontWeight="semibold" colorPalette="gray" size="md" variant="surface">Inactive</Badge>
  }

}
