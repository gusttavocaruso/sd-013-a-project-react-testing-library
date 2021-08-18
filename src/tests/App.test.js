import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test do App', () => {
  test('Tesde dos links', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  test('Teste dos clicks', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favoritePokemon = screen.getByText('Favorite Pokémons');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    fireEvent.click(favoritePokemon);
    expect(history.location.pathname).toBe('/favorites');
  });
});
