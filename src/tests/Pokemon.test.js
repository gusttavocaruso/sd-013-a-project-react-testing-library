import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import Pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  describe('Teste se é renderizado um card com as informações do pokémon.', () => {
    it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
      RenderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite={ false } />);

      const name = screen.getByTestId('pokemon-name');
      const type = screen.getByTestId('pokemon-type');
      const weight = screen.getByTestId('pokemon-weight');
      const image = screen.getByAltText('Pikachu sprite');
      expect(name.innerHTML).toBe('Pikachu');
      expect(type.innerHTML).toBe('Electric');
      expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
      expect(image).toBeInTheDocument();
      expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });

    it('Teste o card do Pokémon ', () => {
      const { history } = RenderWithRouter(<Pokemon
        pokemon={ Pokemons[0] }
        isFavorite={ false }
      />);

      const link = screen.getByText('More details');
      userEvent.click(link);
      const { location: { pathname } } = history;
      expect(link).toBeInTheDocument();
      expect(pathname).toBe('/pokemons/25');
    });

    it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
      RenderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite />);

      const image = screen.getByAltText('Pikachu is marked as favorite');
      expect(image).toBeInTheDocument();
      expect(image.src).toBe('http://localhost/star-icon.svg');
    });
  });
});
