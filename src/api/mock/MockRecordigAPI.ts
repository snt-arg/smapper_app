import { RecordingStatus } from "@/types/Recording";

let recordingStatus: RecordingStatus = { state: "Idle" };

export async function startRecording(): Promise<RecordingStatus> {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (recordingStatus.state !== "Idle") {
                throw Error("Recording is already in progress");
            }

            recordingStatus.state = "Recording";
            recordingStatus.metadata = { elapsed_time: 23, bag_name: "Some name", bag_size: 213242, start_time: 1234213241, stop_time: 31234123423, topics: [] }
            resolve(recordingStatus);
        }, 200)
    })
}

export async function stopRecording(): Promise<RecordingStatus> {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (recordingStatus.state !== "Recording") {
                throw Error("Recording session is not running");
            }

            recordingStatus.state = "Idle";
            recordingStatus.metadata = { elapsed_time: 124, bag_name: "Some name", bag_size: 213242, start_time: 1234213241, stop_time: 31234123423, topics: [] }
            const finalStatus = recordingStatus;
            recordingStatus.metadata = undefined;
            resolve(finalStatus);
        }, 200)
    })
}

export async function fetchRecordingStatus(): Promise<RecordingStatus> {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (recordingStatus.state !== "Recording") {
                throw Error("Recording session is not running");
            }
            resolve(recordingStatus);
        }, 200)
    })
}
