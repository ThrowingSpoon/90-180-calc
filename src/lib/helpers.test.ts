import {
  describe, expect, it,
} from 'vitest';
import { doesOverlap } from '@/lib/helpers';

/**
 * Test date comparison logic
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
