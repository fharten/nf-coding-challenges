/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './layout';

jest.mock('./components/Navbar', () => () => <div>MockNavbar</div>);
jest.mock('./components/Footer', () => () => <div>MockFooter</div>);

describe('Layout', () => {
  it('renders Navbar, Footer and children correctly', () => {
    render(
      <>
        <Layout>
          <p>Test child</p>
        </Layout>
        ,
      </>,
    );

    expect(screen.getByText('MockNavbar')).toBeInTheDocument();
    expect(screen.getByText('MockFooter')).toBeInTheDocument();
    expect(screen.getByText('Test child')).toBeInTheDocument();
  });
});
