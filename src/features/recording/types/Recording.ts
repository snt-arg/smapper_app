/**
 * Represents metadata for a recording session.
 *
 * @interface RecordingMetadata
 * @property {string} bag_name - The name of the ROS bag file associated with the recording.
 * @property {number} start_time - The start time of the recording in seconds (UNIX timestamp).
 * @property {number} stop_time - The stop time of the recording in seconds (UNIX timestamp).
 * @property {number} elapsed_time - The total duration of the recording in seconds.
 * @property {number} bag_size - The size of the recording in bytes.
 * @property {string[]} topics - A list of topics captured during the recording.
 */
export interface RecordingMetadata {
  bag_name: string
  start_time: number
  stop_time: number
  elapsed_time: number
  bag_size: number
  topics: string[]
}

/**
 * Represents a request to start a recording session.
 * Contains necessary information to initiate the recording.
 *
 * @interface RecordingStartRequest
 * @property {string} name - The name of the recording session.
 * @property {string[]} topics - A list of topics to be captured during the recording.
 * @property {string} detail - A description or additional details for the recording session.
 * @property {string[]} [tags] - Optional list of tags for categorizing or identifying the recording.
 */
export interface RecordingStartRequest {
  name: string
  topics: string[]
  detail: string
  tags?: string[]
}

/**
 * Represents the status of a recording session.
 * Indicates the state of the recording and optionally includes metadata.
 *
 * @interface RecordingStatus
 * @property {string} state - The current state of the recording (e.g., "Idle", "Recording").
 * @property {RecordingMetadata} [metadata] - Optional metadata for the recording session.
 */
export interface RecordingStatus {
  state: string
  metadata?: RecordingMetadata
}

export type Presets = Record<string, string[]>
