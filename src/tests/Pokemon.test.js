import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

// Reference: Gabriel Gaspar's code: https://github.com/tryber/sd-013-a-project-react-testing-library/pull/2/files

const { averageWeight:
  { value, measurementUnit }, id, image, name, type } = pokemons[0];

describe('Componente Pokemon', () => {
  describe('É renderizado um card com as informações de determinado pokémon', () => {
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName.innerHTML).toBe(name);
    });

    test('O tipo correto do pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType.innerHTML).toBe(type);
    });

    test('O peso médio do pokémon deve ser exibido com um texto', () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    });

    test('Imagem do Pokémon deve ser exibida e conter um atributo "alt"', () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
      const img = screen.getByAltText(`${name} sprite`);
      const src = img.src === image;
      expect(src).toBeTruthy();
    });
  });

  test('Card contém um link de navegação para exibir detalhes e o link funciona', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link.href).toBe(`http://localhost/pokemons/${id}`);
    userEvent.click(link);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
