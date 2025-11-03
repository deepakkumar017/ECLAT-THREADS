import { render, screen } from '@testing-library/react';
import App from './ECLATApp';

test('renders brand tagline', () => {
  render(<App />);
  const tagline = screen.getByText(/Wear Your Story\./i);
  expect(tagline).toBeInTheDocument();
});
