import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing Component FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeDefined();
  });

  test('Teste se todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);
    const moreDetails = 'More details';
    const favoritar = 'Pokémon favoritado?';
    const number = 3;

    fireEvent.click(screen.getByText('Home'));

    fireEvent.click(screen.getByText('Bug'));
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
    expect(favs).toHaveLength(number);
  });
});
