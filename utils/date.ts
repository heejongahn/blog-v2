import { parseISO, format } from "date-fns";

export function parseDate(dateString: string) {
  return parseISO(dateString);
}

export function formatDate(date: Date, dateFormat?: string) {
  return format(date, dateFormat ?? `yyyy. M. d`);
}

export function prettifyDate(dateString: string, dateFormat?: string) {
  return formatDate(parseDate(dateString), dateFormat);
}
