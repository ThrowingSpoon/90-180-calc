import { render, screen } from '@testing-library/react';
import {
  expect,
  test,
} from 'vitest';
import Navsplash from './NavSplash';

/**
 * Super simple render and check for text test
 */
test('Navsplash component', () => {
  render(<Navsplash />);

  const calculatorElement = screen.getByText(/calculator/i);
  expect(calculatorElement).toBeDefined();

  const faqElement = screen.getByText(/FAQ/i);
  expect(faqElement).toBeDefined();
});
