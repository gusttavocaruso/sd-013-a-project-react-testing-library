import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import Pokemons from '../data';

afterEach(cleanup);

const { id, name, type, averageWeight: { value, measurementUnit }, image } = Pokemons[0];

describe('Teste o componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite={ false } />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe(name);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe(type);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    const img = screen.getByAltText(`${name} sprite`);
    const src = img.src === image;

    expect(src).toBeTruthy();
  });

  it('Teste link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ Pokemons[0] }
      isFavorite={ false }
    />);

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`http://localhost/pokemons/${id}`);
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite />);

    const favPoke = screen.getByAltText(`${name} is marked as favorite`);
    expect(favPoke).toBeInTheDocument();
    expect(favPoke.src).toBe('http://localhost/star-icon.svg');
  });
});
