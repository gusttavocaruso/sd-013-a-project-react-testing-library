import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';
import App from '../App';

const pokemonNames = pokemons.map((current) => current.name);
const pokemonTypes = [];

pokemons.forEach((current) => {
  const alreadyExists = pokemonTypes.find((element) => element === current.type);
  if (!alreadyExists) {
    pokemonTypes.push(current.type);
  }
});

const pokemonName = () => screen.getByTestId('pokemon-name');

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => (
    renderWithRouter(<App
      pokemons={ pokemons }
    />)
  ));

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const encounteredTextPokemon = screen.getByRole('heading', {
      name: /Encountered pokémons/,
      level: 2,
    }); expect(encounteredTextPokemon).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo pokémon;', () => {
    const button = screen.getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
  });

  test('Verifica se muda o pokemon quando clicar em próximo', () => {
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });

    const nameArea = pokemonName();
    for (let contador = 0; contador <= nameArea[contador]; contador += 1) {
      expect(nameArea).toHaveTextContent(pokemonNames[contador]);
      userEvent.click(nextPokemon);
    }
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Verifica se é renderizado apenas um pokemon por vez', () => {
    const PokemonName = screen.getAllByTestId('pokemon-type');

    expect(PokemonName).toHaveLength(1);
  });

  test('Verifica se possui os botões de filtro', () => {
    const button = screen.getAllByTestId('pokemon-type-button');
    expect(button.length).toBe(pokemonTypes.length);
  });

  test('Verifica se mostra apenas os pokemons filtrados', () => {
    const filteredPokemons = pokemons.filter((current) => current.type === 'Fire');

    const nextPokemonButton = screen.getByTestId('next-pokemon');
    const pokemonNameArea = pokemonName();

    const filterButton = screen.getByRole('button', { name: 'Fire' });

    userEvent.click(filterButton);
    expect(pokemonNameArea).toHaveTextContent(filteredPokemons[0].name);
    userEvent.click(nextPokemonButton);
    expect(pokemonNameArea).toHaveTextContent(filteredPokemons[1].name);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const filterAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(filterAll).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });

    const nameArea = pokemonName();
    for (let contador = 0; contador <= nameArea[contador]; contador += 1) {
      expect(nameArea).toHaveTextContent(pokemonNames[contador]);
      userEvent.click(nextPokemon);
    }
    userEvent.click(filterAll);
    expect(nextPokemon).toBeInTheDocument();
  });
});
