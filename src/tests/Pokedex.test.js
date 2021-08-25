import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito cinco: Pokédex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const POKE_NAME = 'pokemon-name';

  it('Verifica se existe uma h2 com o texto especificado', () => {
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('Verifica que o próximo Pokémon é exibido quando clicamos no botão', () => {
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();

    const bicho = screen.getByTestId(POKE_NAME);
    expect(bicho).toBeInTheDocument();

    pokemons.map((pokemon, i) => {
      expect(bicho).toHaveTextContent(pokemon.name);
      userEvent.click(nextButton);
      return expect(bicho).not.toHaveTextContent(pokemons[i].name);
    });

    pokemons.forEach((pokemon, i) => {
      if (i < pokemons.length - 1) {
        userEvent.click(nextButton);
      }
    });

    const lastPokemon = pokemons[pokemons.length - 1].name;
    expect(bicho).toHaveTextContent(lastPokemon);
    userEvent.click(nextButton);

    const firstPokemon = pokemons[0].name;
    expect(bicho).toHaveTextContent(firstPokemon);
  });

  it('Verifique que a Pokédex tem botões de filtro', () => {
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(types.length);

    buttons.map((button, i) => {
      expect(button).toBeInTheDocument();
      return expect(buttons[i]).toHaveTextContent(types[i]);
    });
  });

  it('Verifica se ao filtrar por tipo, são exibidos os pokémons daquele tipo', () => {
    const bicho = screen.getByTestId(POKE_NAME);
    const bugButton = screen.getByRole('button', { name: /bug/i });
    expect(bugButton).toBeInTheDocument();
    userEvent.click(bugButton);
    expect(bicho).toHaveTextContent('Caterpie');
  });

  it('Verifica as funcionalidades do botão All', () => {
    const allButton = screen.getByRole('button', { name: /All/i });
    const bicho = screen.getByTestId(POKE_NAME);
    const nextButton = screen.getByTestId('next-pokemon');
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    pokemons.forEach((pokemon, i) => {
      expect(bicho).toHaveTextContent(pokemons[i].name);
      userEvent.click(nextButton);
      expect(allButton).toBeInTheDocument();
    });
  });
});
