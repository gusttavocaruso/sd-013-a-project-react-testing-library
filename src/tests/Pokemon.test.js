import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';
// Desenvolvido com ajuda de Ygor Maia
describe('6- Testa o componente Pokemon.js', () => {
  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];

  test('É renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const pkmnName = screen.getByTestId('pokemon-name');
    expect(pkmnName).toHaveTextContent(name);

    const pkmnType = screen.getByTestId('pokemon-type');
    expect(pkmnType).toHaveTextContent(type);

    const pkmnWeight = screen.getByTestId('pokemon-weight');
    expect(pkmnWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );

    const pkmnImg = screen.getByAltText(`${name} sprite`);
    expect(pkmnImg).toHaveAttribute('src', image);
  });

  test('O card contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const linkToDetails = screen.getByRole('link', { name: /More Details/i });
    expect(linkToDetails).toBeInTheDocument();
    userEvent.click(linkToDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favoritePokemon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
  });
});
