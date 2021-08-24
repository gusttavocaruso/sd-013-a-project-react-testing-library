import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente "Pokedex".', () => {
  const pokemonName = 'pokemon-name';

  test('Testa se é exibido um h2 com o texto "Encountered pokémons".', () => {
    renderWithRouter(<App />);

    const encounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon ao clicar no botão.', () => {
    renderWithRouter(<App />);

    const proxPoke = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(proxPoke).toBeInTheDocument();
    userEvent.click(proxPoke);

    const pokeName = screen.getByTestId(pokemonName);
    expect(pokeName).toHaveTextContent(/charmander/i);
  });

  test('Testa se é exibido o primeiro Pokémon ao passar do final da lista.', () => {
    renderWithRouter(<App />);

    const proxPoke = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(proxPoke).toBeInTheDocument();

    // Código abaixo feito com a ajuda do código do Pedro Trasfereti
    pokemons.forEach(() => userEvent.click(proxPoke));

    const pokeName = screen.getByTestId(pokemonName);
    expect(pokeName).toHaveTextContent(pokemons[0].name);
  });

  test('Testa se é exibido apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const numero = screen.getAllByTestId(pokemonName);
    expect(numero.length).toBe(1);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
