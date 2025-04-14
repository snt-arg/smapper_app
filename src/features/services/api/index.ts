import { ServiceAPI as real } from './serviceAPI.ts'
import { ServiceAPI as mock } from './mockServiceAPI.ts'

const ServiceAPI = import.meta.env.VITE_MOCK_API ? mock : real

console.log(
  'Using ServiceAPI:',
  import.meta.env.VITE_MOCK_API ? 'Mock' : 'Real'
)

export default ServiceAPI
