import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navsplash from './NavSplash';

/**
 * Super simple render and check test
 */
test('Navsplash component', () => {
  render(<Navsplash />);
  const element = screen.getByText(/calculator/i);
  expect(element).toBeDefined();
});
