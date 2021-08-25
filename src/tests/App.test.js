// Requisito 1

import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se o componente <App.js /> contém links de navegação.', () => {
  it('O primeiro link deve possuir o texto "Home"', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Home/i });
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O segundo link deve possuir o texto "About"', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /About/i });
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('O segundo link deve possuir o texto "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
