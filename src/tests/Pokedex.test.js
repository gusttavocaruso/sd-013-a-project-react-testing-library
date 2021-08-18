import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';

const pokemons = [
  {
    id: 1,
    name: 'Pikachu',
    averageWeight: { measurementUnit: 'm', value: '5' },
    type: 'eletrico',
  },
  {
    id: 2,
    name: 'Bulbassauro',
    averageWeight: { measurementUnit: 'm', value: '5' },
    type: 'eletrico',
  },
  {
    id: 3,
    name: 'Charmander',
    averageWeight: { measurementUnit: 'm', value: '5' },
    type: 'fogo',
  },
];

const isPokemonFavoriteById = { 1: true, 2: true, 3: true };

describe('Testa o componente Pokedex.js', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveTextContent(/Próximo pokémon/i);

    const firstPokemon = screen.getByText(/Pikachu/i);

    userEvent.click(nextButton);
    const secondPokemon = screen.getByText(/Bulbassauro/i);
    expect(secondPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    const thirdPokemon = screen.getByText(/Charmander/i);
    expect(thirdPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const names = screen.getAllByTestId('pokemon-name');
    expect(names.length).toBe(1);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const allButton = screen.getByTestId('');
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent(/All/i);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(2);
    expect(filterButtons[0]).toHaveTextContent(pokemons[0].type);

    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(filterButtons[0]);
    userEvent.click(nextButton);
    const secondPokemon = screen.getByText(/Bulbassauro/i);
    expect(secondPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const allButton = screen.getByTestId('');
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent(/All/i);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(filterButtons[0]);
    userEvent.dblClick(nextButton);

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(allButton);
    userEvent.dblClick(nextButton);
    const thirdPokemon = screen.getByText(/Charmander/i);
    expect(thirdPokemon).toBeInTheDocument();
  });
});
