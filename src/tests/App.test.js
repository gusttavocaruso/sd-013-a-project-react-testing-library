import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica funcionalidades do componente App', () => {
  it('Verifica o link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    history.push('/');
    const pokedexText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
    });
    expect(pokedexText).toBeInTheDocument();
  });

  it('Verifica o link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    history.push('/about');
    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });

  it('Verifica o link Favorite pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    history.push('/favorites');
    const favoriteText = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
    });
    expect(favoriteText).toBeInTheDocument();
  });

  it('Verifica página não encontrada com url incorreta', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/any-route');

    const notFoundText = screen.getByRole('heading', {
      name: /not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
