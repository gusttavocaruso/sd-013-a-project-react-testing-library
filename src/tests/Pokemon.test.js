import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      const pokemonType = screen.getByText(pokemon.type);
      const pokemonWeigth = screen.getByText(`Average weight: ${pokemon.pokemonWeigth}`);
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonWeigth).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
});
