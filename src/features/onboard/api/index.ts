import { OnboardAPI as real } from './onboardAPI.ts'
import { OnboardAPI as mock } from './mockOnboardAPI.ts'

const OnboardAPI = import.meta.env.VITE_MOCK_API ? mock : real

export default OnboardAPI
