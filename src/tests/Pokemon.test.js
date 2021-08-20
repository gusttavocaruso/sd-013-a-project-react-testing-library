import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Conjunto de testes', () => {
  test('Testa se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonAverageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonAverageWeight).toBeInTheDocument();

    const pokemonImg = screen.getAllByRole('img');
    expect(pokemonImg[0].src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg[0].alt).toBe('Pikachu sprite');
  });

  test('Testa se o card Pokémon contém um link para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetailsLink = screen.getByText('More details');
    expect(pokemonDetailsLink).toBeInTheDocument();
    fireEvent.click(pokemonDetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const pokemonFavoriteLink = screen.getByText('Pokémon favoritado?');
    fireEvent.click(pokemonFavoriteLink);

    const pokemonStarIcon = screen.getAllByRole('img');
    expect(pokemonStarIcon[1].src).toContain('/star-icon.svg');
    expect(pokemonStarIcon[1].alt).toBe('Pikachu is marked as favorite');
  });
});
