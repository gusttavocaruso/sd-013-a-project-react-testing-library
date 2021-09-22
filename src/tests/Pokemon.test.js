import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

const {
  id,
  name,
  type,
  averageWeight: { value, measurementUnit },
  image,
} = pokemons[0];

describe('Testa se renderiza card de cada pokemon', () => {
  it('testa se um card renderiza informação do pokemon correoto', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const getPokemonName = screen.getByTestId('pokemon-name');
    expect(getPokemonName).toHaveTextContent(name);

    const getPokemonType = screen.getByTestId('pokemon-type');
    expect(getPokemonType).toHaveTextContent(type);

    const getImageByAltText = screen.getByTestId('pokemon-weight');
    expect(getImageByAltText).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });

  it('Testa links de navegação', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('testa o icone de favoritar', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favoritePokemon = screen.getByRole('img',
      { name: `${name} is marked as favorite` });
    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
  });
});
