// @flow

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

export const calculatePercentage = (duration: string) => {
  switch (duration) {
    case "day":
    case "week":
    case "month":
    case "year":
    default:
      return 0;
  }
};
