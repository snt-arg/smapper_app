/**
 * Represents the status of a topic in a messaging system.
 *
 * @interface TopicStatus
 * @property {string} status - The current status of the topic (e.g., "Online", "Offline").
 * @property {string} name - The name of the topic.
 * @property {string} msg_type - The type of messages the topic handles.
 * @property {number} hz - The frequency of messages in Hertz (Hz).
 * @property {number} subscribers - The number of subscribers to the topic.
 */
export interface TopicStatus {
  status: string
  name: string
  msg_type: string
  hz: number
  subscribers: number
}
