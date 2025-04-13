/**
 * Represents a topic in a ROS (Robot Operating System) bag file.
 * Used for database purposes to store topic metadata.
 * 
 * @interface RosbagTopic
 * @property {string} id - Unique identifier for the topic.
 * @property {string} name - The name of the topic.
 * @property {string} msg_type - The message type of the topic.
 */
export interface RosbagTopic {
    id: number;
    name: string;
    msg_type: string;
}

/**
 * Represents metadata for a ROS bag file.
 * Stores information about the bag file such as size, duration, tags, and topics.
 * 
 * @interface RosbagMetadata
 * @property {string} id - Unique identifier for the bag file metadata.
 * @property {string} name - The name of the bag file.
 * @property {number} size - The size of the bag file in bytes.
 * @property {number} duration - The duration of the bag file in seconds.
 * @property {number} start_time - The start time of the recording in seconds (UNIX timestamp).
 * @property {number} end_time - The end time of the recording in seconds (UNIX timestamp).
 * @property {string} detail - Additional details or description of the bag file.
 * @property {string[]} tags - A list of tags associated with the bag file for categorization.
 * @property {RosbagTopic[]} topics - The topics contained within the ROS bag file.
 */
export interface RosbagMetadata {
    id: number;
    name: string;
    size: number;
    duration: number;
    start_time: number;
    end_time: number;
    detail: string;
    tags?: string[];
    topics: RosbagTopic[];
}

/**
 * Represents the update object for modifying ROS bag metadata.
 * Allows partial updates to the name, detail, or tags of a ROS bag file.
 * 
 * @interface RosbagMetadataUpdate
 * @property {string} [name] - Updated name of the bag file (optional).
 * @property {string} [detail] - Updated description/detail of the bag file (optional).
 * @property {string[]} [tags] - Updated list of tags for categorization (optional).
 */
export interface RosbagMetadatUpdate {
    name?: string;
    detail?: string;
    tags?: string[];
}
