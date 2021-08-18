import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Req 5', () => {
  test('A página contém um heading h2', () => {
    renderWithRouter(<App />);

    const header = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(header).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll); // resetar a aplicação

    const btnNext = screen.getByTestId('next-pokemon');

    const arrayDePokemons = pokemons.map((pokemon) => pokemon.name);// pego a lista de pokemons fazendo um map e selecionando cada pokemons pelo nome

    arrayDePokemons.forEach((pokemon, index) => {
      userEvent.click(btnNext);
      const name = screen.getByTestId(/pokemon-name/);

      if (index === arrayDePokemons.length - 1) {
        expect(name.innerHTML).toBe(arrayDePokemons[0]);
      } else {
        expect(name.innerHTML).toBe(arrayDePokemons[index + 1]);
      }
    });
  });
});
