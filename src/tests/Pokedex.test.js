import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando Pokedex.js', () => {
  test('Teste se contém heading h2 com o texto "Encountered pokémons."', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading', {
      name: /pokémons/i,
    });

    expect(headingH2).toBeInTheDocument();
  });

  test('Mostrar o próximo pokemon quando "Próximo pokémon" for clicado', () => {
    renderWithRouter(<App />);

    const allPokemonFilter = screen.getByText(/all/i);
    userEvent.click(allPokemonFilter);

    const namePokemon = screen.getByTestId('pokemon-name');
    const nextPokeBtn = screen.getByText(/Próximo pokémon/i);

    pokemons.forEach(({ name }) => {
      expect(namePokemon).toHaveTextContent(name);
      userEvent.click(nextPokeBtn);
    });

    expect(namePokemon).toHaveTextContent('Pikachu');
  });
  // Feito com Gabriel Biasoli
  test('Teste se a Pokedex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const typesSet = new Set();
    pokemons.forEach(({ type }) => typesSet.add(type));
    const types = [...typesSet];
    const buttonAll = screen.getByText('All');

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((typeBtn, i) => {
      expect(buttonAll).toBeInTheDocument();
      expect(typeBtn).toHaveTextContent(types[i]);
    });
  });
});
