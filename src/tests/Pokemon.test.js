import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('testando cards dos pokemons', () => {
  it('deve renderizar os dados de determinado pokemon', () => {
    renderWithRouter(<App />);

    Pokemons.forEach((pokemon) => {
      const { name, type, averageWeight, image } = pokemon;

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByRole('img', {
        name: `${name} sprite`,
      });

      const pokemonAvarageW = `${averageWeight.value} ${averageWeight.measurementUnit}`;
      const pokemonWeightValues = `Average weight: ${pokemonAvarageW}`;

      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toHaveTextContent(pokemonWeightValues);
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute('src', image);

      const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      fireEvent.click(nextPokemonBtn);
    });
  });

  it('testa o link dos cards', () => {
    const { history } = renderWithRouter(<App />);
    const Pokemon = Pokemons[0];
    const { id } = Pokemon;

    const getLink = screen.getByRole('link', { name: 'More details' });
    expect(getLink).toBeInTheDocument();
    fireEvent.click(getLink);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('testa se pokemons favoritados possuem estrela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/i);
    fireEvent.click(moreDetails);

    const clickCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    fireEvent.click(clickCheckbox);
    expect(clickCheckbox.checked).toBe(true);

    const getStarSvg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(getStarSvg).toBeInTheDocument();
    expect(getStarSvg).toHaveAttribute('src', '/star-icon.svg');
  });
});
