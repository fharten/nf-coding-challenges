import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('renders correctly with all items', () => {
    render(<Footer />);

    expect(screen.getByText(/©/)).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });
});
