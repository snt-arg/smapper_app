import { ActionBar, Portal, Button } from "@chakra-ui/react"
import { TrashIcon } from "lucide-react";

export interface RosbagActionBarProps {
  open: boolean,
  selected?: number,
  onDelete?: () => void
}

export default function RosbagActionBar({ open, selected, onDelete }: RosbagActionBarProps) {
  return (
    <ActionBar.Root open={open}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger>
              {selected} selected
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <Button variant="outline" size="sm" onClick={onDelete}>
              <TrashIcon />
              Delete
            </Button>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
}
