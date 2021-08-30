type props = {
  year: number;
  month: number;
  day: number;
} | null;
export function fromDateSelect(fromDate: props): Date {
  return fromDate?.day
    ? new Date(fromDate.year, fromDate.month - 1, fromDate.day)
    : new Date();
}
export function toDateSelect(fromDate: props, toDate: props): Date {
  return toDate?.day
    ? new Date(toDate.year, toDate.month - 1, toDate.day)
    : fromDate?.day
    ? new Date(fromDate.year, fromDate.month - 1, fromDate.day)
    : new Date();
}
