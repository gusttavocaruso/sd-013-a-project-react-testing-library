import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import apiPokemons from '../data';

afterEach(cleanup);

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const headingText = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(headingText).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();

    const pokeNames = apiPokemons.map((pokemon) => pokemon.name);
    const pokeTestID = screen.getByTestId('pokemon-name');

    for (let index = 0; index <= pokeNames.length; index += 1) {
      if (index === pokeNames.length) {
        expect(pokeTestID).toHaveTextContent(pokeNames[0]);
      } else {
        expect(pokeTestID).toHaveTextContent(pokeNames[index]);
        userEvent.click(nextButton);
      }
    }
  });

  test('Se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokeTestID = screen.getAllByTestId('pokemon-name');
    expect(pokeTestID).toHaveLength(1);
  });

  test('Se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const pokeTypes = apiPokemons.map((pokemon) => pokemon.type);
    const reduced = [...new Set(pokeTypes.reduce((acc, cur) => [...acc, cur], []))];

    const allButtons = screen.getAllByTestId('pokemon-type-button');

    reduced.forEach((redu, index) => {
      expect(allButtons[index]).toHaveTextContent(redu);

      const allButton = screen.getByRole('button', {
        name: 'All',
      });
      expect(allButton).toBeInTheDocument();
    });
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    userEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
  });
});
