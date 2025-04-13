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
import { FieldValues, useForm } from 'react-hook-form'
import { useState } from 'react'

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

export default function RecordingModal({
  disabled,
  onStart,
}: {
  disabled?: boolean
  onStart: (data: RecordingStartRequest) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [modalOpen, setModalOpen] = useState(false)

  const onSubmit = (data: FieldValues) => {
    const raw_tags: string = data.tags
    const tags: string[] = raw_tags.split(',').map((tag) => tag.trim())

    const bag = {
      name: data.name,
      detail: data.detail,
      tags: tags,
      topics: topics,
    }

    onStart(bag)
    setModalOpen(!modalOpen)
  }

  const FormControl = () => (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root required={!!errors.name}>
            <Field.Label>
              Name
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter name" {...register('name')} />
            <Field.HelperText>The name of recording/rosbag</Field.HelperText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Description</Field.Label>
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
            <Field.HelperText>Separate tags with comma</Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <Field.Label>Topics</Field.Label>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>

      <Dialog.Footer onSubmit={handleSubmit(onSubmit)}>
        <Dialog.ActionTrigger asChild>
          <Button variant="outline" onClick={() => setModalOpen(!modalOpen)}>
            Cancel
          </Button>
        </Dialog.ActionTrigger>
        <Button type="submit">Start</Button>
      </Dialog.Footer>
    </Box>
  )

  return (
    <Dialog.Root open={modalOpen} size="lg">
      <Dialog.Trigger asChild>
        <Button
          colorScheme="teal"
          colorPalette="blue"
          size={{ base: 'xs', sm: 'lg' }}
          disabled={disabled}
          onClick={() => setModalOpen(!modalOpen)}
        >
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

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={() => setModalOpen(!modalOpen)} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
