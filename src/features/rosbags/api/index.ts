import { RosbagAPI as real } from './rosbagAPI'
import { RosbagAPI as mock } from './mockRosbagAPI'

const RosbagAPI = import.meta.env.VITE_MOCK_API ? mock : real

export default RosbagAPI
