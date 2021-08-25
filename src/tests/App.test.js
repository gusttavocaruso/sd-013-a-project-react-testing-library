import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App.js tests', () => {
  test('if links from home exists', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  test('if links redirect to right paths', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });
  // test broken lint again
});
