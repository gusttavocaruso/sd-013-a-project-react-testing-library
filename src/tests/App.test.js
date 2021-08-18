import React from 'react';
import { screen, userEvent } from './index';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    const textHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(textHome);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);
    const textAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(textAbout);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const textFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(textFavorite);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
