import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import isFavoriteById from './helpers/mockIsFavoriteByID';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testando Pokemon.js', () => {
  const pokemon = pokemons[0];
  const { name, type, id, image, averageWeight: { value, measurementUnit } } = pokemon;
  let history;
  beforeEach(() => {
    history = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavoriteById[id] }
      />,
    ).history;
  });
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    const name_ = screen.getByTestId('pokemon-name');
    expect(name_.textContent).toBe(name);
    const type_ = screen.getByTestId('pokemon-type');
    expect(type_.textContent).toBe(type);
    const weight_ = screen.getByTestId('pokemon-weight');
    expect(weight_.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    const image_ = screen.getByAltText(`${name} sprite`);
    expect(image_).toBeInTheDocument();
    expect(image_.src).toBe(image);
  });
  test('se existe um link de navegação para exibir detalhes deste pokémon', () => {
    const link_ = screen.getByRole('link', { name: 'More details' });
    expect(link_.href).toBe(`http://localhost/pokemons/${id}`);
    let currentURL = history.location.pathname;
    expect(currentURL).toBe('/');
    userEvent.click(link_);
    currentURL = history.location.pathname;
    expect(currentURL).toBe(`/pokemons/${id}`);
  });
  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const image_ = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(image_.src).toStrictEqual('http://localhost/star-icon.svg');
    expect(image_.alt).toStrictEqual(`${name} is marked as favorite`);
  });
});
