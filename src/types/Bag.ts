// TODO: This schema will change on API
export interface BagSchema {
    id: string,
    name: string,
    bag_size: string,
    detail: string,
    tags: string[]
    rosbag_metadata: {
        duration: number,
        unix_timestamp: number,
        topics: {
            name: string,
            msg_type: string,
            hz: string,
            message_count: string,
            status: string
        }
        message_count: number,
        db_path: string
    }
}

export interface RecordingSchema {
    name: string;
    topics: string[] | null;
    detail: string | null;
    tags: string[] | null;
}

export interface RecordingStatus {
    id: string;
    status: string;
}
