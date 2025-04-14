/**
 * Format a timestamp in seconds into a string of the form (hh:)mm:ss
 *
 * @description This function takes a timestamp in seconds and formats it into a string
 * in the format hh:mm:ss. If the timestamp is less than an hour, it formats it as mm:ss.
 *
 * @param timestamp - Timestamp to be formated
 * @returns A string representing the time in (hh:)mm:ss format
 */
export function formatSecondTimestamp(timestamp: number): string {
  const hours = Math.floor(timestamp / 3600)
  const mins = Math.floor(timestamp / 60)
  const secs = Math.floor(timestamp % 60)

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }
  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`
}

/**
 * Format bytes into a human-readable string
 *
 * @param bytes - Number of bytes to be formatted
 * @returns A string representing the size in MB or GB
 */
export function formatFileSize(bytes: number): string {
  const mb = bytes / 1e6
  const gb = bytes / 1e9
  return gb < 1 ? mb.toFixed(0) + ' MB' : gb.toFixed(1) + ' GB'
}
