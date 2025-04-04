import { Badge } from "@chakra-ui/react"


export default function ServiceStatusBadge({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case ("active"):
      return <Badge fontWeight="semibold" colorPalette="green" size="sm" variant="surface">Active</Badge>
    case ("failure"):
      return <Badge fontWeight="semibold" colorPalette="red" size="sm" variant="surface">Failure</Badge>
    case ("terminated"):
      return <Badge fontWeight="semibold" colorPalette="yellow" size="sm" variant="surface">Terminated</Badge>
    default:
      return <Badge fontWeight="semibold" colorPalette="gray" size="sm" variant="surface">Inactive</Badge>
  }

}
