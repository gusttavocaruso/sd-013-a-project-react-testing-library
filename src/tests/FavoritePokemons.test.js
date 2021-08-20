import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Conjunto de testes', () => {
  test('Testa se aparece a mensagem correspondente se não tiver nenhum favorito', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const correspondingMessage = screen.getByText(/No favorite pokemon found/i);
    expect(correspondingMessage).toBeInTheDocument();
  });

  test('Testa se é exibido todos os pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    fireEvent.click(moreDetails);

    const labelFavoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(labelFavoriteCheckbox);

    const favoritePokemonsLink = screen.getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemonsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });
});
