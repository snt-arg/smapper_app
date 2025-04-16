import { TopicAPI as real } from './topicAPI.ts'
import { TopicAPI as mock } from './mockTopicAPI.ts'

const TopicAPI = import.meta.env.VITE_MOCK_API ? mock : real

export default TopicAPI
