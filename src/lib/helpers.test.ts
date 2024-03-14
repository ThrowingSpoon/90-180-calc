import {
  describe, expect, it,
} from 'vitest';
import { calcDaysInLastX, doesOverlap } from '@/lib/helpers';

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
