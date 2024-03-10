import { format } from 'date-fns';

export const dateStringToFormat = (dateString: string, dateFormat: string) => {
  const newDate = Date.parse(dateString);

  const finalDate = new Date(newDate).toISOString();

  return format(finalDate, dateFormat);
};
