import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
// import App from '../App';
import pokemons from '../data';

describe('Testa componente Pokedex.js.', () => {
  test('A página deve conter um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const textPokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(textPokedex).toBeInTheDocument();
  });

  test('Deve exibir o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const button = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(button);
    const nam = screen.getByText('Charmander');
    expect(nam).toBeDefined();

    const type = screen.getAllByText('Fire');
    expect(type).toBeDefined();

    const averageWeight = screen.getByText('Average weight: 8.5 kg');
    expect(averageWeight).toBeDefined();
  });

  test('Deve ser mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const onlyPokemon = screen.getAllByTestId('pokemon-name');
    expect(onlyPokemon.length).toBe(1);
  });

  test('A Pokédex deve ter os botões de filtro.', () => {
    const numMagic = 7;
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton.length).toBe(numMagic);
  });

  test('A Pokédex deve conter um botão para resetar o filtro.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const allButton = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
  });
});
