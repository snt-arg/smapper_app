import {
  Box,
  CloseButton,
  Button,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { RecordingStartRequest } from '@/types/Recording'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export default function RecordingModal({
  disabled,
  onStart,
}: {
  disabled?: boolean
  onStart: () => void
}) {
  const [bag, setBag] = useState<RecordingStartRequest>({
    name: '',
    detail: '',
    topics: [],
    tags: [],
  })
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: FieldValues) => {
    const tags = data.tags.replace(' ', '').split()

    // TODO: This needs to be updated with a list of available topics
    const topics = [
      '/ouster/points',
      '/ouster/imu',
      '/camera/front_right/image_raw',
      '/camera/front_right/camera_info',
      '/camera/front_left/image_raw',
      '/camera/front_left/camera_info',
      '/camera/side_right/image_raw',
      '/camera/side_right/camera_info',
      '/camera/side_left/image_raw',
      '/camera/side_left/camera_info',
    ]
    console.log('Form data:', data)
  }

  const FormControl = () => (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>
              Name
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter name" {...register('name')} />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Detail
              <Field.RequiredIndicator />
            </Field.Label>
            <Textarea
              placeholder="Write a small description about the recording"
              {...register('detail')}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Tags</Field.Label>
            <Input
              placeholder="Enter tags (comma separated)"
              {...register('tags')}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Topics
              <Field.RequiredIndicator />
            </Field.Label>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>

      <Button type="submit">Submit</Button>
    </Box>
  )

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button colorScheme="teal" colorPalette="blue" disabled={disabled}>
          Start Recording
        </Button>
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
              <FormControl />
            </Dialog.Body>
            <Dialog.Footer onSubmit={handleSubmit(onSubmit)}>
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
  )
}
