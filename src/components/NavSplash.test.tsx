import {
  describe, expect, it, test,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import { DateRange } from 'react-day-picker';
import Navsplash from './NavSplash';
import { doesOverlap } from '@/lib/helpers';

/**
 * Super simple render and check test
 */
test('Navsplash component', () => {
  render(<Navsplash />);
  const element = screen.getByText(/calculator/i);
  expect(element).toBeDefined();
});

/**
 * Test date comparison logic
 */
describe('overlaps', () => {
  it('should find overlap', () => {
    const dateRangeA: DateRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 10),
    };
    const dateRangeB: DateRange = {
      from: new Date(2024, 0, 9),
      to: new Date(2024, 0, 11),
    };
    expect(doesOverlap(dateRangeA, dateRangeB)).toBe(true);
  });

  it('should find no overlap', () => {
    const dateRangeA1: DateRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 10),
    };
    const dateRangeB1: DateRange = {
      from: new Date(2024, 0, 10),
      to: new Date(2024, 0, 11),
    };
    expect(doesOverlap(dateRangeA1, dateRangeB1)).toBe(false);

    const dateRangeA2: DateRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 10),
    };
    const dateRangeB2: DateRange = {
      from: new Date(2024, 0, 11),
      to: new Date(2024, 0, 12),
    };
    expect(doesOverlap(dateRangeA2, dateRangeB2)).toBe(false);
  });
});
