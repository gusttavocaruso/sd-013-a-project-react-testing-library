import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Pokedex', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  const DATA_TEST = 'pokemon-name';
  const DATA_TEST_ID_TYPE = 'pokemon-type-button';

  test('Testa se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const texth2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(texth2).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const buttonProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonProximo).toBeInTheDocument();

    const pokemonId = screen.getByTestId(DATA_TEST);
    pokemons.map((pokemon, index) => {
      expect(pokemonId).toHaveTextContent(pokemon.name);
      fireEvent.click(buttonProximo);
      return expect(pokemonId).not.toHaveTextContent(pokemons[index].name);
    });

    pokemons.forEach((_, index) => {
      if (index < pokemons.length - 1) fireEvent.click(buttonProximo);
    });
    const ultimoPokemon = pokemons[pokemons.length - 1].name;
    expect(pokemonId).toHaveTextContent(ultimoPokemon);

    const primeiroPokemon = pokemons[0].name;
    fireEvent.click(buttonProximo);
    expect(pokemonId).toHaveTextContent(primeiroPokemon);
  });
  test('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const pokemon = screen.getAllByTestId(DATA_TEST);
    expect(pokemon.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const buttonsTypes = screen.getAllByTestId(DATA_TEST_ID_TYPE);
    expect(buttonsTypes.length).toBe(types.length);

    buttonsTypes.map((buttonType, index) => expect(buttonType)
      .toHaveTextContent(types[index]));

    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(buttonAll).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const proximoPokemon = screen.getByTestId(DATA_TEST);
    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });
    const buttonProximo = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);

    pokemons.forEach((_, index) => {
      expect(proximoPokemon).toHaveTextContent(pokemons[index].name);
      fireEvent.click(buttonProximo);
      expect(buttonAll).toBeInTheDocument();
    });
  });
});
