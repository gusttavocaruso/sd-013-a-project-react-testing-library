import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando Componente PokemonDetails:', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  const {
    name,
    foundAt,
    summary,
  } = pokemons[0];

  test('Testa se são mostradas informações detalhadas do Pokemon', () => {
    const pokeDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeDetails);

    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    expect(pokeDetails).not.toBeInTheDocument();
    const summaryText = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(summaryText).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  test('Testa se existe os mapas com localização dos Pokemons', () => {
    const pokeDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeDetails);
    const locationText = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(locationText).toBeInTheDocument();
    foundAt.forEach((item, i) => {
      const pokeMap = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(pokeMap[i]).toHaveAttribute('src', item.map);
      expect(pokeMap[i]).toHaveAttribute('alt', `${name} location`);
    });
  });

  test('Testa se usuário pode favoritar um Pokemon', () => {
    const pokeDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeDetails);
    const favBox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(favBox);
    const starIcon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
