import { RecordingAPI as real } from './recordingAPI.ts'
import { RecordingAPI as mock } from './mockRecordingAPI.ts'

const RecordingAPI = import.meta.env.VITE_MOCK_API ? mock : real

export default RecordingAPI
