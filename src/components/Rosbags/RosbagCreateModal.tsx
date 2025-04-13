import { CloseButton, Button, Dialog, Field, Fieldset, Input, Portal, Stack, Textarea } from "@chakra-ui/react";
import { RecordingStartRequest } from "@/types/Recording";
import { useState } from "react";

export default function RecordingModal({ disabled, onOpen, onStart }: { disabled?: boolean, onOpen: () => void, onStart: () => void }) {
  const [bag, setBag] = useState<RecordingStartRequest>({ name: "", detail: "", topics: [], tags: [] });

  const updateValues = (event) => {
    console.log(event.target.value);
  }



  return (
    <Dialog.Root>
      <Dialog.Trigger >
        <Button colorScheme="teal" onClick={onOpen} mb={4} colorPalette="blue" disabled={disabled}>Start Recording</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Stack>
                <Dialog.Title>Start a new Recording</Dialog.Title>
                <Dialog.Description>
                  Please provide the basic information about the recording.
                </Dialog.Description>
              </Stack>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root onChange={}>
                <Fieldset.Content>
                  <Field.Root required>
                    <Field.Label>Name<Field.RequiredIndicator /></Field.Label>
                    <Input name="name" placeholder="Enter name" onChange={} />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label >Detail<Field.RequiredIndicator /></Field.Label>
                    <Textarea name="detail" placeholder="Write a small description about the recording" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      Tags
                    </Field.Label>
                    <Input placeholder="Enter tags (comma separated)" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Topics<Field.RequiredIndicator /></Field.Label>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button onClick={onStart}>Start</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );

}
