const BYTES_PER_KILOBYTE = 1024;

export function formatKilobytes(bytes) {
  return `${(bytes / BYTES_PER_KILOBYTE).toFixed(2)} KB`;
}
