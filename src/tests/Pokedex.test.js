import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2Pokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(h2Pokedex).toBeInTheDocument();
  });

  test('É exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const pokemonsLength = 9;

    const buttonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();

    const primeiroPokemon = screen.getByText('Pikachu');

    expect(primeiroPokemon).toBeInTheDocument();
    expect(pokemons.length).toBe(pokemonsLength);
  });

  test('É mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const dataName = screen.getAllByTestId('pokemon-name');
    expect(dataName.length).toBe(1);
  });

  test('Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const arrType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const btnsFilter = screen.getAllByTestId('pokemon-type-button');
    btnsFilter.forEach((btnFilter) => expect(btnFilter).toBeInTheDocument());

    btnsFilter
      .forEach((btnFilter, index) => expect(btnFilter.innerHTML).toBe(arrType[index]));

    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(btnAll);
    expect(btnAll).toBeInTheDocument();
  });
});
