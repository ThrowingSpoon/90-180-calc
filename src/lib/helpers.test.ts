/* eslint-disable no-console */
import {
  describe, expect, it,
} from 'vitest';
import {
  calcDaysInLastX, doesOverlap, sortDates,
  sortStays,
} from '@/lib/helpers';
import { Stays } from './types';

/**
 * Test date overlap logic
 */
describe('overlaps', () => {
  it('should find overlap', () => {
    const aFrom = new Date(2024, 0, 1);
    const aTo = new Date(2024, 0, 10);
    const bFrom = new Date(2024, 0, 9);
    const bTo = new Date(2024, 0, 11);

    expect(doesOverlap(aFrom, aTo, bFrom, bTo)).toBe(true);
  });

  it('should find no overlap when the A and B share the same middle date', () => {
    const aFrom = new Date(2024, 0, 1);
    const aTo = new Date(2024, 0, 10);
    const bFrom = new Date(2024, 0, 10);
    const bTo = new Date(2024, 0, 11);

    expect(doesOverlap(aFrom, aTo, bFrom, bTo)).toBe(false);
  });

  it('should find no overlap when the A and B do not share the same middle date', () => {
    const aFrom = new Date(2024, 0, 1);
    const aTo = new Date(2024, 0, 10);
    const bFrom = new Date(2024, 0, 11);
    const bTo = new Date(2024, 0, 12);

    expect(doesOverlap(aFrom, aTo, bFrom, bTo)).toBe(false);
  });
});

/**
 * Test date calculation logic
 */
describe('date calulations', () => {
  it('should calculate correctly when all days are after the cutoff date', () => {
    const stays = [ // Should all add up to 18 days
      { from: new Date(2024, 0, 1), to: new Date(2024, 0, 10) },
      { from: new Date(2024, 0, 15), to: new Date(2024, 0, 20) },
      { from: new Date(2024, 0, 22), to: new Date(2024, 0, 23) },
    ];

    const calcFrom = new Date(2024, 0, 30);
    const totalDays = calcDaysInLastX(calcFrom, stays);
    expect(totalDays).toEqual(18);
  });

  it('should calculate correctly when cutoff date is inbetween one stay', () => {
    const stays = [ // Should all add up to 14 days if cutoff is 5th Jan 2024
      { from: new Date(2024, 0, 1), to: new Date(2024, 0, 10) },
      { from: new Date(2024, 0, 15), to: new Date(2024, 0, 20) },
      { from: new Date(2024, 0, 22), to: new Date(2024, 0, 23) },
    ];

    const calcFrom = new Date(2024, 0, 30);
    const totalDays = calcDaysInLastX(calcFrom, stays, 25);
    expect(totalDays).toEqual(14);
  });
});

describe('date sorting', () => {
  it('should sort dates by "from" value', () => {
    const dates = [
      { from: new Date(2024, 0, 22), to: new Date(2024, 0, 23) },
      { from: new Date(2024, 0, 1), to: new Date(2024, 0, 10) },
      { from: new Date(2024, 0, 15), to: new Date(2024, 0, 20) },
    ];

    const filteredDates = sortDates(dates);

    expect(filteredDates[0].from).toEqual(new Date(2024, 0, 1));
    expect(filteredDates[1].from).toEqual(new Date(2024, 0, 15));
    expect(filteredDates[2].from).toEqual(new Date(2024, 0, 22));
  });

  it('should sort stays by "start" value', () => {
    const stays: Stays = {
      a: {
        stayId: 'a',
        start: new Date(2024, 0, 22),
        end: new Date(2024, 0, 23),
        days: 0,
        daysInLast180: 0,
        error: '',
      },
      b: {
        stayId: 'b',
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 10),
        days: 0,
        daysInLast180: 0,
        error: '',
      },
      c: {
        stayId: 'c',
        start: new Date(2024, 0, 15),
        end: new Date(2024, 0, 20),
        days: 0,
        daysInLast180: 0,
        error: '',
      },
      d: {
        stayId: 'd',
        start: undefined,
        end: undefined,
        days: 0,
        daysInLast180: 0,
        error: '',
      },
    };

    const sortedStays = sortStays(stays);
    const keys = Object.keys(sortedStays);

    expect(keys[0]).toEqual('d');
    expect(keys[1]).toEqual('b');
    expect(keys[2]).toEqual('c');
    expect(keys[3]).toEqual('a');
  });
});

describe('sandbox', () => {
  it('sandbox', () => {

  });
});
