import {
  Box,
  Button,
  Dialog,
  Input,
  Portal,
  Stack,
  Textarea,
} from '@chakra-ui/react'

import { FieldValues, useForm } from 'react-hook-form'
import { RosbagMetadata, RosbagMetadatUpdate } from '../types/Rosbag'

export default function UpdateRosbagModal({
  rosbag,
  onUpdate,
}: {
  rosbag: RosbagMetadata
  onUpdate: (data: Partial<RosbagMetadatUpdate>) => void
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: rosbag.name,
      detail: rosbag.detail,
      tags: rosbag.tags,
    },
  })

  const onSubmit = (data: FieldValues) => {
    const raw_tags: string = data.tags as string
    const tags: string[] = raw_tags.split(',').map((tag) => tag.trim())

    const new_bag: RosbagMetadatUpdate = {
      name: data.name as string,
      detail: data.detail as string,
      tags: tags,
    }

    onUpdate(new_bag)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Update</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit Rosbag</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box
                as="form"
                onSubmit={(e) => {
                  // Prevent default form submission
                  e.preventDefault()
                  void handleSubmit(onSubmit)(e)
                }}
              >
                <Stack>
                  <Input {...register('name')} placeholder="Name" />
                  <Textarea {...register('detail')} placeholder="Detail" />
                  <Input
                    {...register('tags')}
                    placeholder="Tags (comma separated)"
                  />
                </Stack>
                <Dialog.Footer mt="4">
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button type="submit">Update</Button>
                </Dialog.Footer>
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
