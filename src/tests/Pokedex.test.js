import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';

describe('Pokedex component:', () => {
  it('should have an h2 \'Encountered pokémons\'', () => {
    renderWithRouter(<App />);
    const h2 = screen.queryByRole('heading', { name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  it(`should show the next pokémon when the 'próximo pokémon' btn is
clicked and show only one pokémon at a time`, () => {
    renderWithRouter(<App />);
    const pokemonMap = pokemons.map((pokemon) => pokemon.name);
    const pokemonTestId = screen.queryByTestId(POKEMON_NAME);
    expect(pokemonTestId.textContent).toBe(pokemonMap[0]);

    for (let i = 1; i <= pokemonMap.length - 1; i += 1) {
      const pokemonAllByTestId = screen.queryAllByTestId(POKEMON_NAME);
      const nextBtn = screen.queryByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(nextBtn);
      if (i === pokemonMap.length) {
        expect(pokemonTestId.textContent).toBe(pokemonMap[0]);
        expect(pokemonAllByTestId.length).toBe(1);
      }
      expect(pokemonTestId.textContent).toBe(pokemonMap[i]);
      expect(pokemonAllByTestId.length).toBe(1);
    }
  });

  it('should have filter by type buttons', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeTestId = screen.queryAllByTestId('pokemon-type-button');
    const btnAll = screen.queryByRole('button', { name: 'All' });
    typeTestId.forEach((type, index) => {
      expect(type.textContent).toBe(types[index]);
      expect(btnAll).toBeVisible();
      userEvent.click(type);
      const filteredPokemons = pokemons
        .filter((pokemon) => pokemon.type === types[index]);
      filteredPokemons.forEach((pokemon) => {
        const pokemonName = screen.queryByTestId(POKEMON_NAME);
        expect(pokemonName.textContent).toBe(pokemon.name);
        const nextBtnIsVisible = screen.getByRole('button', { name: 'Próximo pokémon' });
        if (nextBtnIsVisible.visible) {
          userEvent.click(nextBtnIsVisible);
        }
      });
    });
  });
});
