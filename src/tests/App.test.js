import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test component app.js to verify if it has valid links', () => {
  test('if "home" button links to route "/"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('if "about" button links to route "/about"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('if "Favorite Pokémons" button links to route "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
