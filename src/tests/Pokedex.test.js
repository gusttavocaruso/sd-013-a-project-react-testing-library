import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from '../render-router';

import pokemons from '../data';

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: true,
  65: true,
  78: false,
  148: true,
  151: false,
};

describe('Pokedex.js tests', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
  });

  test('Exibe um heading com um texto', () => {
    const heading2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading2).toBeInTheDocument();
  });

  test('Exibe o próximo pokemon da lista ao clicar no botão', () => {
    const proximoPokemon = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(proximoPokemon).toBeInTheDocument();
    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      fireEvent.click(proximoPokemon);
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Testa se é mostrado um pokemón por vez', () => {
    const poke = screen.getAllByTestId('pokemon-name');
    expect(poke.length).toBe(1);
  });

  test('Testa se existe um botão para resetar o filtro', () => {
    const bttReset = screen.getByRole('button', {
      name: /All/i,
    });
    fireEvent.click(bttReset);
    expect(bttReset).toBeInTheDocument();
  });

  test('Testa se a Pokédex tem os botões de filtro ', () => {
    const filtroBtt = screen.getAllByTestId('pokemon-type-button');
    userEvent.type(filtroBtt);
    expect(filtroBtt[1]).toHaveTextContent('Fire');
  });
});
