import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const idName = 'pokemon-name';

describe('Componente <Pokedex />', () => {
  test('contém um heading h2 com o texto Encountered pokémons', async () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('é exibido o próximo da lista quando o botão Próximo é clicado.', () => {
    renderWithRouter(<App />);

    // pega o primeiro
    const firstPokemonName = screen.getByTestId(idName);
    expect(firstPokemonName).toBeInTheDocument();
    const first = firstPokemonName.textContent;

    // clica no botão
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    // pega segundo pokemon da lista
    const secondPokemonName = screen.getByTestId(idName);
    expect(secondPokemonName).toBeInTheDocument();
    const second = secondPokemonName.textContent;
    // compara os dois
    expect(first !== second)
      .toBeTruthy();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    let allPokemons = screen.getAllByTestId(idName);
    expect(allPokemons.length).toBe(1);

    const allButtons = screen.getAllByRole('button');
    allButtons.forEach((button) => {
      userEvent.click(button);
      allPokemons = screen.getAllByTestId(idName);
      expect(allPokemons.length).toBe(1);
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    pokemons.forEach((pokemon) => {
      const buttonTypeExists = allButtons
        .some((button) => button.textContent === pokemon.type);
      expect(buttonTypeExists).toBeTruthy();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(resetButton).toBeInTheDocument();
  });
});
