import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import App from '../App';

function allPokemons() {
  pokemons.forEach((pokemon) => {
    const pokemonName = screen.getByText(pokemon.name);
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  });
}

describe('Testa o component Pokedex', () => {
  test('Teste se página tem um h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const getText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(getText).toBeInTheDocument();
  });

  test('Testa se é exibido o Pokémon da lista quando o botão Próximo pokémon é clicado.',
    () => {
      renderWithRouter(<App />);

      allPokemons();
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
    });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    const buttonElectric = screen.getByRole('button', { name: /electric/i });
    const buttonFire = screen.getByRole('button', { name: /fire/i });

    userEvent.click(buttonElectric);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.click(buttonFire);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    expect(button).toBeEnabled();

    userEvent.click(button);

    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);

    allPokemons();
  });
});
