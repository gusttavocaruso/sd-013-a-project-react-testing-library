import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  const namepokemon = 'pokemon-name';
  const nextpokemon = 'next-pokemon';
  it('este se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const msgEncounteredPokes = screen.getByText('Encountered pokémons');
    expect(msgEncounteredPokes).toBeInTheDocument();
  });
  it('Teste é exibido o próx Pokémon da lista quando o botão Próximo pokémon é clicado.',
    () => {
      renderWithRouter(<App />);
      const firstPokemon = screen.getByTestId(namepokemon).innerHTML;
      const buttonNextPokemon = screen.getByTestId(nextpokemon);
      expect(buttonNextPokemon).toHaveTextContent('Próximo pokémon');

      pokemons.forEach(() => userEvent.click(buttonNextPokemon));
      const pokemonAfterTurnAllPokemons = screen.getByTestId(namepokemon).innerHTML;
      expect(firstPokemon).toBe(pokemonAfterTurnAllPokemons);
    });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(namepokemon);
    expect(pokemon).toHaveLength(1);
  });
});
