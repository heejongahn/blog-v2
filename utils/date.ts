import { parseISO, format } from "date-fns";

export function parseDate(dateString: string) {
  return parseISO(dateString);
}

export function formatDate(date: Date) {
  return format(date, `yyyy. M. d`);
}

export function prettifyDate(dateString: string) {
  return formatDate(parseDate(dateString));
}
