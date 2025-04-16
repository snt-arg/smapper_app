/**
 * Represents metadata for a sensor.
 * Stores essential details about the sensor including its name, model, type, and associated service ID.
 *
 * @interface SensorMetadata
 * @property {string} name - The name of the sensor.
 * @property {string} model - The model of the sensor.
 * @property {string} type - The type or category of the sensor (e.g., temperature, pressure, etc.).
 * @property {string} service_id - The unique identifier for the service associated with the sensor.
 */
export interface SensorMetadata {
  name: string
  model: string
  type: string
  service_id: string
}
