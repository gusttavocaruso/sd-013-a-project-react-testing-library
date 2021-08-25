import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import userEvent from '@testing-library/user-event';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  const pokemonId = 'pokemon-name';

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon d Próximo pokémon é clicado.', () => {
    // O botão deve conter o texto Próximo pokémon
    const button = screen.getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    const pokemonName = screen.getByTestId(pokemonId);
    expect(pokemonName).toBeInTheDocument();
    pokemons.map((pokemon, index) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(button);
      return expect(pokemonName).not.toHaveTextContent(pokemons[index].name);
    });
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    const pokemonsId = screen.getAllByTestId(pokemonName);
    pokemons.forEach((pokemon, index) => {
      if (index < pokemons.length - 1) {
        userEvent.click(button);
      }
      expect(pokemonsId.length).toBe(1);
    });

    const lastPokemon = pokemons[pokemons.length - 1].name;
    expect(pokemonName).toHaveTextContent(lastPokemon);
    userEvent.click(button);

    const firstPokemon = pokemons[0].name;
    expect(pokemonName).toHaveTextContent(firstPokemon);
  });
});
