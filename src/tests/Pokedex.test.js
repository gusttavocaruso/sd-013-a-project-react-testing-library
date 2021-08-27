import { screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

afterEach(cleanup);

describe('Teste o componente <Pokedex.js />', () => {
  // test-ids
  const pokeTest = 'pokemon-name';
  const buttonNextId = 'next-pokemon';
  const typesId = 'pokemon-type-button';

  test('Teste se página contém um h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  test('clicar no botão "proximo pokemon", mostra um novo pokemon na tela', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByTestId(buttonNextId);
    const firstPokemon = screen.getByText('Pikachu');
    const pokeTestId = screen.getByTestId(pokeTest);

    expect(buttonNext).toBeInTheDocument(); // testa se há um botao.
    expect(pokeTestId).toBeInTheDocument(); // testa se há um pokemon na tela.

    pokemons.map((pokemon) => {
      expect(pokeTestId).toHaveTextContent(pokemon.name);
      return fireEvent.click(buttonNext);
    });
    expect(firstPokemon).toBeInTheDocument(); // testa se o primeiro pokemon está na tela
  });

  test('Testa se exibe um pokemon por vez', () => {
    renderWithRouter(<App />);

    const pokemonElement = screen.getAllByTestId(pokeTest);
    const buttonNext = screen.getByTestId(buttonNextId);

    pokemons.map(() => {
      expect(pokemonElement.length).toBe(1);
      return fireEvent.click(buttonNext);
    });
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const types = screen.getAllByTestId(typesId);

    const typeArr = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];

    types.forEach((type, i) => {
      expect(type).toHaveTextContent(typeArr[i]);
    });

    expect(new Set(types).size !== typeArr.length).toBe(false); // espera que não haja elementos repetidos!
    expect(screen.getByText(/all/i)).toBeVisible();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    const nextButton = screen.getByTestId(buttonNextId);
    const allButton = screen.getByText(/all/i);
    expect(allButton).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /dragon/i }));
    fireEvent.click(allButton);
    const NUMBER_THREE = 3;

    for (let i = 0; i < NUMBER_THREE; i += 1) {
      fireEvent.click(nextButton);
    }

    expect(screen.getByText(/ekans/i)).toBeInTheDocument();
  });
});
