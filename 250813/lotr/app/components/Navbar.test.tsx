import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders correctly with all navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('VOLUMES')).toBeInTheDocument();
    expect(screen.getByText('CREATE NEW')).toBeInTheDocument();
  });

  it('has correct href attributes for navigation links', () => {
    render(<Navbar />);

    const homeLink = screen.getByText('HOME');
    const volumesLink = screen.getByText('VOLUMES');
    const createLink = screen.getByText('CREATE NEW');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(volumesLink).toHaveAttribute('href', '/volumes');
    expect(createLink).toHaveAttribute('href', '/volumes/create');
  });
});
