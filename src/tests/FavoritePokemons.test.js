import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderRouter from '../render-router';
import App from '../App';

describe('FavoritePokemons tests', () => {
  test('Exibe tela de mensagem', () => {
    render(<FavoritePokemons />);

    const favoriteP = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteP).toBeInTheDocument();
  });

  test('Exibe cards favoritados', () => {
    const { history } = renderRouter(<App />);

    history.push('/pokemons/25'); // resgafta um pokemon do histórico
    const addFavorito = screen.getByRole('checkbox'); // checkbox para favoritar o pokemon
    fireEvent.click(addFavorito); // clica em adicionar o pokemon ao favorito
    expect(addFavorito.checked).toEqual(true); // espera que o pokemon favoritado seja true
  });
});
