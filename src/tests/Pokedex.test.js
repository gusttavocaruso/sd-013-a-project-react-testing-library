import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

// Vinicius Dionysio me ajudou bastante a fazer esse requisito.
describe('Teste o componente Pokedex', () => {
  test('Se página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Se é exibido o proximo pokémon da lista quando botão "Próximo" é clicado', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);

    const secondPokémon = screen.getByText(/charmander/i);
    expect(secondPokémon).toBeInTheDocument();
  });

  test('Se é mostrado um pokémon por vez', () => {
    renderWithRouter(<App />);
    const allPokemons = screen.getAllByTestId('pokemon-name');
    expect(allPokemons.length).toBe(1);

    const allButtons = screen.getAllByRole('button');
    allButtons.forEach((but) => {
      userEvent.click(but);
      expect(allPokemons.length).toBe(1);
    });
  });

  test('Se a pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    pokemons.forEach((pok) => {
      const buttonsExists = allButtons
        .some((but) => but.textContent === pok.type);
      expect(buttonsExists).toBeTruthy();
    });
  });

  test('Se a pokédex tem um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonReset = screen.getByRole('button', { name: /all/i });
    expect(buttonReset).toBeInTheDocument();
  });
});
