import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

it('deve renderizar o titulo "Encountered pokémons"', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const Header = screen.getByRole('heading', { name: /Encountered pokémons/i });
  expect(Header).toBeInTheDocument();
});

it('testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
  pokemons.forEach((pokemon, index) => {
    const pokemon1 = pokemon;
    const nextIndex = index === (pokemons.length - 1) ? 0 : index + 1;
    const nextPokemon = pokemons[nextIndex];
    const pokemonName = screen.getByText(pokemon1.name);
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const pokemonNextName = screen.getByText(nextPokemon.name);
    expect(pokemonNextName).toBeInTheDocument();
  });
});

it('testa se é mostrado apenas um pokemon', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  
});
