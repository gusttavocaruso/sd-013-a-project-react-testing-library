import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonDate from '../data';
import { Pokemon } from '../components';

describe('Verificando o componente <Pokemon.js />', () => {
  const { id,
    name, type,
    averageWeight: { value, measurementUnit },
    image } = pokemonDate[1];

  it(`Verifica se é renderizado um card
  com as informações de determinado pokémon.`, () => {
    renderWithRouter(<Pokemon pokemon={ pokemonDate[1] } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);

    const average = screen.getByTestId('pokemon-weight');
    expect(average).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', image);

    const altImgText = screen.getByAltText(`${name} sprite`);
    expect(altImgText).toHaveAttribute('src', image);
  });

  it('Verifica se o card do Pokémon contém link de navegação de mais detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonDate[1] }
        isFavorite={ false }
      />,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(moreDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados..', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonDate[1] } isFavorite />);

    const altIconText = screen.getByAltText(`${name} is marked as favorite`);
    expect(altIconText).toHaveAttribute('src', '/star-icon.svg');
  });
});
