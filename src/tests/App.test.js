import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se na aplicação existe links de navegação - Requisito1 ', () => {
  test('Testa se existe link de navegação como o texto "Home"', () => {
    renderWithRouter(<App />);
    const linkElementHome = screen.getByRole('link', { name: /home/i });
    expect(linkElementHome).toBeInTheDocument();
  });

  test('Testa se existe link de navegação como o texto "About"', () => {
    renderWithRouter(<App />);
    const linkElementAbout = screen.getByRole('link', { name: /about/i });
    expect(linkElementAbout).toBeInTheDocument();
  });

  test('Testa se existe um link com o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const linkElementFavorite = screen.getByRole('link', { name: /favorite/i });
    expect(linkElementFavorite).toBeInTheDocument();
  });
});
