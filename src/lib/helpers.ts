import { isAfter, isBefore, isEqual } from 'date-fns';

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
