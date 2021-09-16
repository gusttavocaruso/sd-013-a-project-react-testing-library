import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    pokemons.forEach(({ name,
      type, averageWeight: { value, measurementUnit }, image }) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeigth = screen.getByTestId('pokemon-weight');
      const pokemonWeightValue = `Average weight: ${value} ${measurementUnit}`;
      const pokemonImg = screen.getByAltText(`${name} sprite`);
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeigth).toHaveTextContent(pokemonWeightValue);
      expect(pokemonImg).toHaveAttribute('src', image);

      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
  test('Testa redirecionamento do link More Details e icone de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const getMoreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(getMoreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const getCheckBoxItem = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(getCheckBoxItem);
    const pokemonImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemonImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
