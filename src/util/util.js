import { } from 'lodash';
import dayjs from 'dayjs';


/**
 * Checks whether the date is in future with respect to current time
 * @param {Date} date The date to check
 */
export function isFutureDate(date) {
  const currentTimeStamp = dayjs();
  return dayjs(date).isAfter(currentTimeStamp);
}

