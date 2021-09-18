import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter'; // atualizado

describe('Teste do componente pokemon', () => {
  const {
    name,
    type,
    averageWeight: {
      value,
      measurementUnit },
    image,
    id,
  } = Pokemons[0];

  it('testa se exibi as infos do pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite={ false } />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe(name);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe(type);
    const averageWeightPokemon = screen.getByTestId('pokemon-weight');
    expect(averageWeightPokemon.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    const imagePokemon = screen.getByAltText(`${name} sprite`).src;
    expect(imagePokemon).toBe(image);
  });
  it('testa redirecionamento para página de detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ Pokemons[0] } isFavorite={ false } />,
    );

    const linkPageDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(linkPageDetails).toBeInTheDocument();
    userEvent.click(linkPageDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('Testa se exibi o icone de estrela', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite />);
    const favoritePokemon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritePokemon);
    const srcFavoritePokemon = favoritePokemon.src;
    expect(srcFavoritePokemon).toBe('http://localhost/star-icon.svg');
  });
});
