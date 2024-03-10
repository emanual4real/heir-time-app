import { format, parseISO } from 'date-fns';

export const dateStringToFormat = (dateString: string, dateFormat: string) => {
  const newDate = parseISO(dateString);

  return format(newDate, dateFormat);
};
