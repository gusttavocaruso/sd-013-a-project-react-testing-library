import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Testando o componente About', () => {
  const pokemonNameId = 'pokemon-name';
  it('Teste se página contém um heading `h2` com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon clicando no botão', () => {
    renderWithRouter(<App />);

    const btnAllPokemon = screen.getByRole('button', { name: /All/i });
    fireEvent.click(btnAllPokemon);

    const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(btnNextPoke);

    const pokeCharmander = screen.getByText(/Charmander/i);
    expect(pokeCharmander).toBeInTheDocument();
  });

  it('Mostrar pokemons um a um ao clicar botão/ Testa botão "All"', () => {
    renderWithRouter(<App />);

    const btnAllPokemon = screen.getByRole('button', { name: /All/i });
    expect(btnAllPokemon).toBeInTheDocument();
    fireEvent.click(btnAllPokemon);

    const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonName = screen.getByTestId(pokemonNameId);
    Pokemons.forEach((pokemon, index) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      fireEvent.click(btnNextPoke);
      expect(pokemonName).not.toHaveTextContent(Pokemons[index].name);
    });
  });

  test('Mostrar o primeiro Pokémon, se estiver no último Pokémon', () => {
    renderWithRouter(<App />);

    const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNextPoke).toBeInTheDocument();

    const pokemonName = screen.getByTestId(pokemonNameId);
    expect(pokemonName).toBeInTheDocument();

    Pokemons.map((pokemon, index) => {
      if (index === Pokemons.length - 1) {
        userEvent.click(btnNextPoke);
        return expect(pokemonName).toHaveTextContent(Pokemons[0].name);
      }
      userEvent.click(btnNextPoke);
      return expect(pokemonName).toHaveTextContent(Pokemons[index + 1].name);
    });
  });

  it(' Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const card = screen.getAllByTestId(pokemonNameId);
    expect(card).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });

    const pokemonTypes = [...new Set(
      Pokemons.reduce((types, { type }) => [...types, type], []),
    )];

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtns.length).toBe(pokemonTypes.length);

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    // O texto do botão deve corresponder ao `nome do tipo`, ex. `Psychic`;
    // O botão `All` precisa estar **sempre** visível.
    pokemonTypes.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();

      userEvent.click(typeButton);
      const pokemonsFilteredTypes = Pokemons.filter((pokemon) => pokemon.type === type);
      pokemonsFilteredTypes.forEach((pokemon) => {
        const textPokemonType = screen.getByTestId('pokemon-type');

        expect(textPokemonType).toHaveTextContent(pokemon.type);
        userEvent.click(btnNextPoke);
        expect(textPokemonType).toHaveTextContent(pokemon.type);
      });
      const btnAllPokemon = screen.getByRole('button', { name: /All/i });
      expect(btnAllPokemon).toBeInTheDocument();
    });
  });
});
