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
    userEvent.click(linkHome);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Deve ser redirecionado para URL "/about" ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Deve ser redirecionado para URL "/favorites" ao clicar Favorite Pokemóns', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(linkFavoritePokemons);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Deve ser redirecionado para Not Found ao entrar em URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/url-desconhecida');
    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
