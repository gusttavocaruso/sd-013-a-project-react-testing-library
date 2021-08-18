import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testing nav links', () => {
  it('should work home link', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const titlePokedex = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(titlePokedex).toBeInTheDocument();
  });

  it('should work about link', () => {
    // const { history } = renderWithRouter(<App />);
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    // testar apenas se foi para o caminho certo, sem verificar
    // o que tem dentro desse componente...
    // const { pathname } = history.location;

    // expect(pathname).toBe('/about');
    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(titleAbout).toBeInTheDocument();
  });

  it('should work favorite pokemons link', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);

    const titleFavorite = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });

    expect(titleFavorite).toBeInTheDocument();
  });

  it('should render \'a not found page\'', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/oksdakosdakodkodsakosadko');

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
