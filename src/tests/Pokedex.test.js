import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';
import App from '../App';

function itaratePokemons() {
  // Achar o botão Próximo Pokemon
  const nextPokemon = screen.getByTestId('next-pokemon');
  expect(nextPokemon).toBeInTheDocument();
  expect(nextPokemon).toHaveTextContent('Próximo pokémon');

  // Achar o nome do Pokemon rederizado pelo data-testid
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();

  pokemons.map((pokemon, index) => {
    const MAX_LENGTH = pokemons.length - 1;
    if (index === MAX_LENGTH) {
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextPokemon);
      return expect(pokemonName).toHaveTextContent(pokemons[0].name);
    }
    expect(pokemonName).toHaveTextContent(pokemon.name);
    userEvent.click(nextPokemon);
    return expect(pokemonName).toHaveTextContent(pokemons[index + 1].name);
  });
}

describe('Teste o cpmponente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a lista mostra o próximo pokemon ao clicar em "Proximo Pokemon"', () => {
    renderWithRouter(<App />);
    itaratePokemons();
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro por tipo', () => {
    renderWithRouter(<App />);
    const types = pokemons.reduce((acc, curr) => {
      if (!acc.includes(curr.type)) {
        acc.push(curr.type);
      }
      return acc;
    }, []);

    const nextPokemon = screen.getByTestId('next-pokemon');
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(types.length);

    types.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();
      userEvent.click(typeButton);
      const allButton = screen.getByRole('button', { name: /All/i });
      expect(allButton).toBeInTheDocument();
      const listByType = pokemons.filter((pokemon) => pokemon.type === type);
      listByType.forEach((item) => {
        const currentPokemon = screen.getByTestId('pokemon-type');
        expect(currentPokemon).toBeInTheDocument();
        expect(currentPokemon).toHaveTextContent(item.type);
        userEvent.click(nextPokemon);
        expect(currentPokemon).toBeInTheDocument();
        expect(currentPokemon).toHaveTextContent(item.type);
        expect(allButton).toBeInTheDocument();
      });
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    itaratePokemons();
  });
});
