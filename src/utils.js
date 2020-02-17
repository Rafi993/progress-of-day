// @flow

import {
  endOfWeek,
  endOfMonth,
  endOfYear,
  endOfDay,
  differenceInSeconds,
  differenceInDays,
  getDaysInMonth,
  getDaysInYear
} from "date-fns";

const morning = 5;
const afternoon = 16;

export const calculateTiming = (): string => {
  const currentHour = new Date().getHours();
  if (currentHour > morning && currentHour < afternoon) {
    // 5AM - 4PM
    return "morning";
  } else if (currentHour > 16 && currentHour < 18) {
    // 4PM - 7PM
    return "evening";
  }
  // 7PM - 5AM
  return "night";
};

export const calculatePercentage = (duration: string): number => {
  const today = new Date();
  let total = 0;
  let difference = 0;

  switch (duration) {
    case "day":
      total = 86400;
      difference = differenceInSeconds(endOfDay(today), today);
      break;
    case "week":
      total = 7;
      difference = differenceInDays(endOfWeek(today), today);
      break;
    case "month":
      total = getDaysInMonth(today);
      difference = differenceInDays(endOfMonth(today), today);
      break;
    case "year":
      total = getDaysInYear(today);
      difference = differenceInDays(endOfYear(today), today);
      break;
    default:
      return 0;
  }

  return (((total - difference) / total) * 100).toFixed(2);
};
