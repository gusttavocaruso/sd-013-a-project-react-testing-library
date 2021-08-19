import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemonsData from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
    const pokemons = pokemonsData;
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const searchH2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(searchH2).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const pokemons = pokemonsData;
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const clickButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(clickButton).toBeInTheDocument();

    pokemons.forEach((pokemon, index) => {
      const currentPokemon = pokemon;
      const nextPokemonIndex = index === (pokemons.length - 1) ? 0 : index + 1;
      const nextPokemon = pokemons[nextPokemonIndex];

      expect(screen.getByText(currentPokemon.name)).toBeInTheDocument();

      userEvent.click(clickButton);

      expect(screen.getByText(nextPokemon.name)).toBeInTheDocument();
    });
  });

  it('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    const pokemons = pokemonsData;
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const pokemonTestId = screen.getAllByTestId('pokemon-name');
    expect(pokemonTestId.length).toBe(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro.', () => {
    const pokemons = pokemonsData;
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const buttonTypesPokemons = screen.getAllByTestId('pokemon-type-button');
    const allTypesPokemons = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    expect(buttonTypesPokemons.length).toBe(allTypesPokemons.length);

    buttonTypesPokemons.map((buttonType, index) => {
      expect(buttonType).toBeInTheDocument();

      return expect(buttonTypesPokemons[index]).toHaveTextContent(
        allTypesPokemons[index],
      );
    });
  });

  it('Verifica se existe o botão "all"', () => {
    const pokemons = pokemonsData;
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll);
    expect(buttonAll).toBeInTheDocument();
  });
});
