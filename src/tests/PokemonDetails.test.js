import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando o Componente FavoritePokemons:', () => {
  test('Teste se é exibida a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(
      screen.getByText('No favorite pokemon found'),
    ).toBeDefined();
  });

  test('Teste se todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);
    const moreDetails = 'More details';
    const favoritar = 'Pokémon favoritado?';
    const THREE = 3;

    fireEvent.click(screen.getByText('Dragon'));
    fireEvent.click(screen.getByText(moreDetails));
    fireEvent.click(screen.getByText(favoritar));

    fireEvent.click(screen.getByText('Home'));

    fireEvent.click(screen.getByText('Normal'));
    fireEvent.click(screen.getByText(moreDetails));
    fireEvent.click(screen.getByText(favoritar));

    fireEvent.click(screen.getByText('Home'));

    fireEvent.click(screen.getByText('Fire'));
    fireEvent.click(screen.getByText(moreDetails));
    fireEvent.click(screen.getByText(favoritar));

    fireEvent.click(screen.getByText('Favorite Pokémons'));

    const favs = screen.getAllByText(/Average weight/i);
    expect(favs).toHaveLength(THREE);
  });
});
