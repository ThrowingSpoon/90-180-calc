import { isAfter, isBefore, isEqual } from 'date-fns';
import { DateRange } from 'react-day-picker';

export function isBeforeOrEqual(
  date: Date | number | string,
  dateToCompare: Date | number | string,
): boolean {
  return (isEqual(date, dateToCompare) || isBefore(date, dateToCompare));
}

export function isAfterOrEqual(
  date: Date | number | string,
  dateToCompare: Date | number | string,
): boolean {
  return (isEqual(date, dateToCompare) || isAfter(date, dateToCompare));
}

export const doesOverlap = (a: DateRange, b: DateRange) => {
  if (a?.to == null || b?.to == null || a?.from == null || b?.from == null) throw new Error('one date supplied was undefined');

  return !(
    (isBeforeOrEqual(a.from, b.from) || isAfterOrEqual(a.from, b.to))
    && (isBeforeOrEqual(a.to, b.from) || isAfterOrEqual(a.to, b.to))
  );
};

export const doesMatch = (a: DateRange, b: DateRange) => {
  if (a?.to == null || b?.to == null || a?.from == null || b?.from == null) throw new Error('one date supplied was undefined');
};
