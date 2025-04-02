export interface TopicSchema {
    name: string,
    msg_type: string,
    hz: number,
    message_count: number | null,
    status: string
}
