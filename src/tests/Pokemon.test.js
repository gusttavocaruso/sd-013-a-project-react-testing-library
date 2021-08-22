import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import apiPokemons from '../data';
import { Pokemon } from '../components';

describe('Teste o componente <Pokemon.js />', () => {
  const { id,
    name, type, averageWeight: { value, measurementUnit }, image } = apiPokemons[1];

  // https://www.tabnine.com/code/javascript/functions/getByTestId?snippet=5f61d07843564f2b5cc20fcd
  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ apiPokemons[1] } isFavorite={ false } />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(name);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(type);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', image);

    const altImgText = screen.getByAltText(`${name} sprite`);
    expect(altImgText).toHaveAttribute('src', image);
  });

  test('Se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ apiPokemons[1] }
        isFavorite={ false }
      />,
    );

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    const url = history.location.pathname;
    expect(url).toBe(`/pokemons/${id}`);
  });

  test('Se caso existe um ícone de estrela nos Pokémons favoritados.  ', () => {
    renderWithRouter(<Pokemon pokemon={ apiPokemons[1] } isFavorite />);

    const altIconText = screen.getByAltText(`${name} is marked as favorite`);
    expect(altIconText).toHaveAttribute('src', '/star-icon.svg');
  });
});
