import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('teste links e rotas', () => {
  it('teste dos links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

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
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);

    const titleHome = screen.getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(titleHome).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);

    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(titleAbout).toBeInTheDocument();

    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favorite);

    const titleFavorites = screen.getByRole('heading', {
      name: /favorite/i,
      level: 2,
    });
    expect(titleFavorites).toBeInTheDocument();
  });

  test('Teste de página não encontrada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-qualquer');
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found /i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
