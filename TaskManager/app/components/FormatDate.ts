import moment from 'moment';


export function formatDatetimestamp(input: string | number | Date): string {
  const date = moment(Number(input)? Number(input) : input);
  if (!date.isValid()) return 'Invalid Date';
  return date.format('MMMM D, YYYY'); // Example: "May 21, 2025"
}