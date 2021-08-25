import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const {
  id,
  name,
  type,
  averageWeight: { value, measurementUnit },
  image,
} = pokemons[0];

describe('Testando Pokemon.js', () => {
  test('Renderiza um card com as informações do respectivo pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(name);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(type);

    const metricPokemon = screen.getByTestId('pokemon-weight');
    expect(metricPokemon).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );

    const imgPokemon = screen.getByAltText(`${name} sprite`);
    expect(imgPokemon).toHaveAttribute('src', image);
  });

  test('Testar se o card contém um link de navegação', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );

    const linkDetails = screen.getByRole('link', { name: /More Details/i });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se exibe um ícone quando clicamos no check', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favoritePokemon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
  });
});
