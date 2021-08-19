import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando componente Pokedex.js', () => {
  it('Deve conter um h2 com o texto "Encoutered pokémons"', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /encountered pokémons/i });

    expect(h2).toBeInTheDocument();
  });

  it('Deve existir um botão "Próximo Pokemon"', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(nextPokemonButton).toBeInTheDocument();
  });

  it('Ao clicar no botão o próximo pokémon deve ser exibido', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokemonName = screen.getByTestId('pokemon-name');

    expect(pokemonName.textContent).toBe(pokemons[0].name);

    userEvent.click(nextPokemonButton);
    expect(pokemonName.textContent).toBe(pokemons[1].name);
    userEvent.click(nextPokemonButton);
    expect(pokemonName.textContent).toBe(pokemons[2].name);
  });

  it('O primeiro pokemon da lista deve ser mostrado'
  + 'se estiver no ultimo pokemon e o botão de próximo for clicado.', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    // for (let index = 0; index < pokemons.length; index += 1) {
    //   userEvent.click(nextPokemonButton);
    // }
    pokemons.forEach(() => userEvent.click(nextPokemonButton));

    const pokemonName = screen.getByTestId('pokemon-name');

    expect(pokemonName.textContent).toBe(pokemons[0].name);
  });

  it('Deve ser mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const numberOfPokemonNames = screen.getAllByTestId('pokemon-name');

    expect(numberOfPokemonNames.length).toBe(1);
  });
});
