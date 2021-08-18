import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('will test link home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const titleHome = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(titleHome).toBeInTheDocument();
  });

  it('will test link about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const titleAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(titleAbout).toBeInTheDocument();
  });

  it('will test link favorite pokemons', () => {
    const { history } = renderWithRouter(<App />);

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favLink).toBeInTheDocument();

    userEvent.click(favLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const titleFav = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
    });
    expect(titleFav).toBeInTheDocument();
  });
});
