import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import { AuthProvider } from '../context/AuthContext';

describe('Landing page', () => {
  it('renders hero headline', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Trusted coverage operations/i)).toBeInTheDocument();
  });
});
