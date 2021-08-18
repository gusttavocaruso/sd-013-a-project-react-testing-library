import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';

describe('Testando o componente App.js', () => {
  it('Deve conter o link "Home", "About" e "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFavoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Deve ser redirecionado para URL "/" ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    const { location: { pathname } } = history;

    userEvent.click(linkHome);

    expect(pathname).toBe('/');
  });
});
