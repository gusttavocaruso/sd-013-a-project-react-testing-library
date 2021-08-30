import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const NEXT_POKEMON = 'Próximo pokémon';
const POKEMON_NAME = 'pokemon-name';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Pokedex.js tests', () => {
  test('if renders heading', () => {
    const pokedexHeader = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(pokedexHeader).toBeInTheDocument();
  });
  test('if renders next pokemon', () => {
    const nextButton = screen.getByRole('button', { name: NEXT_POKEMON });
    userEvent.click(nextButton);

    const secondPokemon = screen.getByTestId(POKEMON_NAME).innerHTML;
    expect(secondPokemon).toStrictEqual(pokemons[1].name);
  });
  test('if renders all pokemons correctly', () => {
    const nextButton = screen.getByRole('button', { name: NEXT_POKEMON });

    for (let i = 0; i <= pokemons.length; i += 1) {
      const pokemon = screen.getByTestId(POKEMON_NAME).innerHTML;
      if (i === pokemons.length) {
        expect(pokemon).toStrictEqual(pokemons[0].name);
        break;
      } else {
        expect(pokemon).toStrictEqual(pokemons[i].name);
        userEvent.click(nextButton);
      }
    }
  });
  test('if only one pokemon per time', () => {
    const nextButton = screen.getByRole('button', { name: NEXT_POKEMON });
    userEvent.click(nextButton);

    const onlyOnePokemon = screen.getAllByTestId(POKEMON_NAME);
    expect(onlyOnePokemon.length).toStrictEqual(1);
  });
  test('if fire type button works', () => {
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);

    const firePokemons = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    const nextButton = screen.getByRole('button', { name: NEXT_POKEMON });

    for (let i = 0; i <= firePokemons.length; i += 1) {
      const pokemon = screen.getByTestId(POKEMON_NAME).innerHTML;
      if (i === firePokemons.length) {
        expect(pokemon).toStrictEqual(firePokemons[0].name);
        break;
      } else {
        expect(pokemon).toStrictEqual(firePokemons[i].name);
        userEvent.click(nextButton);
      }
    }
  });
  test('type filters', () => {
    const numberOfTypes = 7;
    const filters = screen.getAllByTestId('pokemon-type-button');

    expect(filters.length).toStrictEqual(numberOfTypes);
  });

  test('Testa se reseta os filtros', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const normalType = screen.getByRole('button', { name: 'Normal' });
    userEvent.click(normalType);

    userEvent.click(allButton);
    const firstAllPokemon = screen.getByTestId(POKEMON_NAME).innerHTML;
    expect(firstAllPokemon).toStrictEqual(pokemons[0].name);
  });
});
