import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Data from '../data';

describe('teste do Pokedex', () => {
  test('Teste do h2 com Encountered pokémons', () => {
    renderWithRouter(<App />);

    const header2 = screen.getByRole('heading', { name: /Encountered/i });

    expect(header2).toBeInTheDocument();
  });
  test('Teste do botão proximo pokemon', () => {
    renderWithRouter(<App />);

    const data = Data;
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });

    expect(button).toBeInTheDocument();

    data.forEach((pokemon) => {
      if (data.indexOf(pokemon) !== data.length - 1) {
        const indexPokemon = screen.getByText(pokemon.name);
        const noNexPokemon = screen.getAllByTestId('pokemon-name');

        expect(indexPokemon).toBeInTheDocument();
        expect(noNexPokemon.length).toBe(1);
        fireEvent.click(button);
      } else {
        const indexPokemon = screen.getByText(pokemon.name);
        const noNexPokemon = screen.getAllByTestId('pokemon-name');

        expect(indexPokemon).toBeInTheDocument();
        expect(noNexPokemon.length).toBe(1);
        fireEvent.click(button);

        const firstPokemon = screen.getByText('Pikachu');
        expect(firstPokemon).toBeInTheDocument();
        expect(noNexPokemon.length).toBe(1);
      }
    });
  });
  test('teste dos botões de filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    const nestButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    const data = Data;
    const typesButton = screen.getAllByTestId('pokemon-type-button');

    data.forEach((pokemon) => {
      if (data
        .indexOf(pokemon) === data
        .indexOf(data
          .find((poket) => poket.type === pokemon.type))) {
        const typeButton = typesButton
          .find((typeBTN) => typeBTN.innerHTML === pokemon.type);
        expect(typeButton).toBeInTheDocument();
        expect(allButton).toBeInTheDocument();
        fireEvent.click(typeButton);

        const pokeFilter = data.filter((poket) => poket.type === pokemon.type);
        pokeFilter.forEach((poket) => {
          const indexPokemon = screen.getByText(poket.name);
          expect(indexPokemon).toBeInTheDocument();
          fireEvent.click(nestButton);
        });
        const getPokemon = screen.getByText(pokeFilter[0].name);
        expect(getPokemon).toBeInTheDocument();
        expect(allButton).toBeInTheDocument();
      }
    });
    fireEvent.click(allButton);
    data.forEach((pokemon) => {
      const indexPokemon = screen.getByText(pokemon.name);
      expect(indexPokemon).toBeInTheDocument();
      fireEvent.click(nestButton);
    });
    const firstPokemon = screen.getByText(data[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });
});
