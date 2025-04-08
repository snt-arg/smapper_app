/**
 * Represents the details of a service failure.
 * Stores the return code and standard error message from the service.
 * 
 * @interface ServiceFailure
 * @property {number} ret_code - The return code indicating the failure status.
 * @property {string} std_err - The standard error message describing the failure.
 */
export interface ServiceFailure {
    ret_code: number;
    std_err: string;
}

/**
 * Represents the status of a service.
 * Stores information about the service's ID, name, state, and optional failure details.
 * 
 * @interface ServiceStatus
 * @property {string} id - The unique identifier of the service.
 * @property {string} name - The name of the service.
 * @property {string} state - The current state of the service (e.g., "running", "stopped").
 * @property {ServiceFailure} [failure] - Optional failure details if the service has encountered an error.
 */
export interface ServiceStatus {
    id: string;
    name: string;
    state: string;
    failure?: ServiceFailure;
}

