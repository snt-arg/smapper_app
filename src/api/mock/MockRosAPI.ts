import { TopicSchema } from "@/types/Ros";


const topics: TopicSchema[] = [
    {
        name: "/ouster/points",
        msg_type: "/sensors/msgs/PointCloud2",
        status: "Online",
        message_count: 100,
        hz: 10,
    },
    {
        name: "/ouster/imu",
        msg_type: "/sensors/msgs/Imu",
        status: "Online",
        message_count: 1000,
        hz: 100,
    },
    {
        name: "/camera/front_left/image_raw",
        msg_type: "/sensors/msgs/Image",
        status: "Offline",
        message_count: 0,
        hz: 0,
    },
    {
        name: "/camera/front_right/image_raw",
        msg_type: "/sensors/msgs/Image",
        status: "Online",
        message_count: 500,
        hz: 30,
    },
]

export async function fetchTopics(): Promise<TopicSchema[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(topics)
        }, 200)
    })
}

export async function fetchTopic(name: string): Promise<TopicSchema> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const topic = topics.find(item => item.name === name);
            if (!topic) {
                throw Error("Error finding topic");
            }
            resolve(topic)
        }, 200)
    })
}

// TODO:: Add rest of client calls
