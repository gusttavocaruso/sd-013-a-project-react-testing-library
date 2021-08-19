import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 1,
  name: 'Pikachu',
  averageWeight: { measurementUnit: 'kg', value: '5' },
  type: 'eletrico',
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

const isPokemonFavoriteById = { 1: true };

describe('Testa o componente Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );
    const name = screen.getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
    const type = screen.getByText(/eletrico/i);
    expect(type).toBeInTheDocument();
    const averageWeight = screen.getByText(/Average weight: 5 kg/i);
    expect(averageWeight).toBeInTheDocument();
    const pokemonImage = screen.getByAltText(/Pikachu sprite/i);
    expect(pokemonImage).toHaveAttribute('src', pokemon.image);
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );
    const link = screen.getByText(/More details/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });

  it('Testa se ao clicar no link, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );
    const link = screen.getByText(/More details/i);
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );

    const starImage = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(starImage).toBeInTheDocument();
    const src = '/star-icon.svg';
    expect(starImage).toHaveAttribute('src', src);
  });
});
