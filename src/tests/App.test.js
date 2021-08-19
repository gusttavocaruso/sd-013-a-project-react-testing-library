import React from 'react';
import userEvent from '@testing-library/user-event';

import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('teste links e rotas', () => {
  it('teste dos links', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();

    const favoritePokemons = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('teste das rotas', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);

    const titleHome = screen.getByRole('heading', {
      name: /pokédex/i,
    });
    expect(titleHome).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);

    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(titleAbout).toBeInTheDocument();

    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favorite);

    const titleFavorites = screen.getByRole('heading', {
      name: /favorite/i,
    });
    expect(titleFavorites).toBeInTheDocument();
  });

  test('testa página não encontrada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-qualquer');
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found /i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
