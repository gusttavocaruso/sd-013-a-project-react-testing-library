import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import dataPokemon from '../data';

function pokFunction() {
  // Botão com texto "Próximo Pokémon"
  const nextPokemon = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  expect(nextPokemon).toBeInTheDocument();

  // Próximo Pokémon
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();

  dataPokemon.map((pokemon, index) => {
    const numberPokemon = dataPokemon.length - 1;
    if (index === numberPokemon) {
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextPokemon);
      return expect(pokemonName).toHaveTextContent(dataPokemon[0].name);
    }
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(nextPokemon);
    return expect(pokemonName).toHaveTextContent(dataPokemon[index + 1].name);
  });
}

describe('Testar o Pokedex', () => {
  test('Teste se página contém um <h2>.', () => {
    renderWithRouter(<App />);
    const msgPokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(msgPokedex).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon.', () => {
    renderWithRouter(<App />);
    pokFunction();
  });

  test('Teste se é mostrado apenas um Pokémon.', () => {
    renderWithRouter(<App />);
    const uniquePokemon = screen.getAllByTestId('pokemon-name');
    expect(uniquePokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    // Botão com texto "Próximo Pokémon"
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    // Tipos de Poémons
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set
    const pokemonTypes = [...new Set(
      dataPokemon.reduce((types, { type }) => [...types, type], []),
    )];

    // Deve existir um botão de filtragem para cada tipo
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(pokemonTypes.length);

    pokemonTypes.forEach((type) => {
      // https://testing-library.com/docs/queries/byrole/
      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();

      userEvent.click(typeButton);
      const filteredType = pokemonTypes.filter((pokemon) => pokemon.type === type);
      filteredType.forEach((pok) => {
        const selectPok = screen.getByTestId('pokemon-type');
        expect(selectPok).toBeInTheDocument();
        expect(selectPok).toHaveTextContent(pok.type);
        userEvent.click(nextPokemon);
        expect(selectPok).toBeInTheDocument();
        expect(selectPok).toHaveTextContent(pok.type);
      });
      const allButton = screen.getByRole('button', { name: /All/i });
      expect(allButton).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    pokFunction();
  });
});
