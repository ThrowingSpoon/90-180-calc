import {
  differenceInDays, isAfter, isBefore, isEqual,
  subDays,
} from 'date-fns';
import { Stay, Stays } from './types';

export function isBeforeOrEqual(
  date: Date,
  dateToCompare: Date,
): boolean {
  return (isEqual(date, dateToCompare) || isBefore(date, dateToCompare));
}

export function isAfterOrEqual(
  date: Date,
  dateToCompare: Date,
): boolean {
  return (isEqual(date, dateToCompare) || isAfter(date, dateToCompare));
}

/**
 *
 * Checks whether two date ranges overlap, compares a and b, will treat as not overlapping
 * if the start and end dates of the two date ranges supplied are equal
 *
 * @param aFrom beginning date of a
 * @param aTo end date of a
 * @param bFrom beginning date of b
 * @param bTo end date of b
 * @returns true if the dates do overlap, false if not
 */
export const doesOverlap = (aFrom: Date, aTo: Date, bFrom: Date, bTo: Date) => !(
  (isBeforeOrEqual(aFrom, bFrom) || isAfterOrEqual(aFrom, bTo))
  && (isBeforeOrEqual(aTo, bFrom) || isAfterOrEqual(aTo, bTo))
);

export const calcDaysInLastX = (
  calcFrom: Date,
  stays: { from: Date, to: Date }[],
  lastXDays: number = 180,
): number => {
  if (lastXDays <= 0) throw new Error('lastXDays must be greater than 0');
  if (stays.length === 0) return 0;

  let totalDays = 0;
  const cutoffDate = subDays(calcFrom, lastXDays);

  // for each stay, check whether the from date is before the cutoffDate, then add it to the
  // running total, if the cutoffDate is between the stay from and to, only add number of days that overlap
  //
  // key:
  // * C is the cutoff date
  // * each - is a day
  // * | is the calcFrom date
  //
  // The date directly below C adds 6 days, other days are whole, and add all of their days
  //
  // ----------C-----------------------------------------------------------|--------------------
  // ----[-----6-----]--------------------------------------------------------------------------
  // --------------------[-----12-----]---------------------------------------------------------
  // ------------------------------------------------------[--5--]------------------------------
  // -------------------------------------------------------------------------------------------
  stays.forEach((stay) => {
    if (isAfterOrEqual(stay.from, calcFrom)) {
      // if the date is in the future, it can be safely ignored
    } else if (isAfterOrEqual(stay.from, cutoffDate) && isAfterOrEqual(stay.to, cutoffDate)) {
      // if cuttoffDate is before both the from and to of the stay, add the whole stay
      const daysToAdd = differenceInDays(stay.to, stay.from) + 1;
      totalDays += daysToAdd;
    } else if (isAfterOrEqual(cutoffDate, stay.from) && isBeforeOrEqual(cutoffDate, stay.to)) {
      // if cutoffDate is between the from and to, add only the number of days until the to date, rounded up
      const daysToAdd = differenceInDays(stay.to, cutoffDate) + 1;
      totalDays += daysToAdd;
    }
  });

  return totalDays;
};

/**
 * Sort rate ranges by 'from' date
 *
 * @param dates the date ranges to sort
 * @returns dates sorted by 'from' date
 */
export const sortDates = (dates: { from: Date, to: Date }[]): { from: Date, to: Date }[] => {
  const filteredDates = dates.sort((a, b) => {
    if (isAfter(a.from, b.from)) return 1;
    if (isBefore(a.from, b.from)) return -1;
    return 0;
  });

  return filteredDates;
};

/**
 * sort custom stay types by their 'start' date, undefined dates are kept at the beginning
 *
 * @param stays the stays to sort
 * @returns stays sorted by 'start' date, undefined dates are kept at the beginning
 */
export const sortStays = (stays: Stays): Stays => {
  const sortedStays: Stays = {};
  const stayValues = Object.values(stays);

  stayValues.sort((a, b) => {
    if (a.start == null || a.end == null || b.start == null || b.end == null) return -1;
    if (isAfter(a.start, b.start)) return 1;
    if (isBefore(a.start, b.start)) return -1;
    return 0;
  });

  stayValues.forEach((stay: Stay) => {
    sortedStays[stay.stayId] = stay;
  });

  return sortedStays;
};

export const calculateStays = (stays: Stays): Stays => {
  const tempStays: Stays = stays;

  const values = Object.values(tempStays);
  const allDates = values
    .filter((stay) => stay.start != null && stay.end != null)
    .map(
      (stay) => ({ from: stay.start, to: stay.end } as { from: Date; to: Date }),
    );

  values.forEach((currStay) => {
    if (currStay.end == null || currStay.start == null) return;

    const temp = { ...currStay };
    temp.daysInLast180 = calcDaysInLastX(
      currStay.end,
      allDates,
      180,
    );

    tempStays[currStay.stayId] = { ...temp };
  });

  return (tempStays);
};
