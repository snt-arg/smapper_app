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
  Select,
  createListCollection,
  Badge,
} from '@chakra-ui/react'
import {
  Presets,
  RecordingStartRequest,
} from '@/features/recording/types/Recording'
import { FieldValues, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { TopicStatus } from '@/features/topics/types/Topic'
import usePolling from '@/shared/hooks/usePolling'
import TopicAPI from '@/features/topics/api'
import RecordingAPI from '@/features/recording/api'

function NewRecordingForm({
  onStart,
  onClose,
  topics,
  presets,
}: {
  onStart: (data: RecordingStartRequest) => void
  onClose: () => void
  topics: TopicStatus[]
  presets: Presets
}) {
  const { register, handleSubmit } = useForm()
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const onSubmit = (data: FieldValues) => {
    const raw_tags: string = data.tags as string
    const tags: string[] = raw_tags.split(',').map((tag) => tag.trim())

    const bag: RecordingStartRequest = {
      name: data.name as string,
      detail: data.detail as string,
      tags: tags,
      topics: selectedTopics,
    }

    onStart(bag)
    onClose()
  }

  const [activePresets, setActivePresets] = useState<string[]>([])

  const togglePreset = (presetName: string) => {
    const topicsFromPreset = presets[presetName] || []
    const isActive = activePresets.includes(presetName)

    if (isActive) {
      setSelectedTopics((prev) =>
        prev.filter((topic) => !topicsFromPreset.includes(topic))
      )
      setActivePresets((prev) => prev.filter((p) => p !== presetName))
    } else {
      setSelectedTopics((prev) =>
        Array.from(new Set([...prev, ...topicsFromPreset]))
      )
      setActivePresets((prev) => [...prev, presetName])
    }

    console.log('Selected Topics:', selectedTopics)
  }

  const topicCollection = createListCollection({
    items: topics
      .sort()
      .map((topic) => ({ label: topic.name, value: topic.name })),
  })

  return (
    <Box
      as="form"
      onSubmit={(e) => {
        // Prevent default form submission
        e.preventDefault()
        void handleSubmit(onSubmit)(e)
      }}
    >
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root required>
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
            <Select.Root
              multiple
              collection={topicCollection}
              size="sm"
              width="320px"
              value={selectedTopics}
              onValueChange={(selected) => {
                setSelectedTopics(selected.value)
              }}
            >
              <Select.HiddenSelect />
              <Select.Label>Select topics</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Selected topics" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {topicCollection.items.map((topic) => (
                    <Select.Item item={topic} key={topic.value}>
                      {topic.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
            <Stack direction="row" spaceX={2} mt={2}>
              {Object.keys(presets).map((presetKey) => (
                <Badge
                  key={presetKey}
                  variant="solid"
                  cursor="pointer"
                  colorPalette={
                    activePresets.includes(presetKey) ? 'blue' : 'gray'
                  }
                  onClick={() => togglePreset(presetKey)}
                >
                  {presetKey}
                </Badge>
              ))}
            </Stack>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>

      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </Dialog.ActionTrigger>
        <Button type="submit">Start</Button>
      </Dialog.Footer>
    </Box>
  )
}

export default function RecordingModal({
  disabled,
  onStart,
}: {
  disabled?: boolean
  onStart: (data: RecordingStartRequest) => void
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const { data: topics } = usePolling<TopicStatus[]>(
    TopicAPI.getAllTopics,
    5000,
    true
  )

  const [presets, setPresets] = useState<Presets | null>(null)

  useEffect(() => {
    const fetchPresets = async () => {
      const response = await RecordingAPI.getRecordingPresets()
      setPresets(response)
    }
    void fetchPresets()
  }, [])

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
              <NewRecordingForm
                onStart={onStart}
                onClose={() => setModalOpen(!modalOpen)}
                topics={topics ? topics : []}
                presets={presets ? presets : {}}
              />
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
