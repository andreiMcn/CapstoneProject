export function compareDates(start_date: Date, end_date: Date) {
  const currentDate = new Date();
  if (currentDate < new Date(start_date)) return 'upcoming';
  else if (currentDate > new Date(end_date)) return 'past';
  else return 'active';
}

export function fromBinary(encoded: string): any {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}
