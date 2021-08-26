import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('testando a Pokedex', () => {
  it('testa se a pokedex contem o h2', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon clicando no botão', () => {
    renderWithRouter(<App />);

    const filterAll = screen.getByRole('button', { name: /All/i });
    fireEvent.click(filterAll);

    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(nextPokemonBtn);

    const pokeCharmander = screen.getByText(/Charmander/i);
    expect(pokeCharmander).toBeInTheDocument();
  });

  it('um pokemom exibido por vez', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });

  const pokemonTypesArray = [];

  Pokemons.forEach((pokemon) => {
    if (!pokemonTypesArray.includes(pokemon.type)) {
      pokemonTypesArray.push(pokemon.type);
    }
  });

  it('testando quantos botões de filtro existem e se estão repitidos', () => {
    renderWithRouter(<App />);

    const pokemonByTextId = screen.queryAllByTestId('pokemon-type-button');
    expect(pokemonByTextId.length).toBe(pokemonTypesArray.length);
    pokemonTypesArray
      .map((type, index) => expect(pokemonByTextId[index]).toHaveTextContent(type));
  });

  it('testa se só pokemons filtrados aparecem', () => {
    renderWithRouter(<App />);
    const pokemonByTextId = screen.queryAllByTestId('pokemon-type-button');

    pokemonTypesArray.forEach((type, index) => {
      fireEvent.click(pokemonByTextId[index]);
      const getInputAndPokeText = screen.queryAllByText(type);
      expect(getInputAndPokeText.length).toBe(2);
    });
  });
});
