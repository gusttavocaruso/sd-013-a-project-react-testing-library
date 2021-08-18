import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemon.js', () => {
  it('Testa se ao entrar no componente sem favoritos, mostra um texto', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  it('Testa se ao favoritar um pokémon, ele vai para a página de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const detailsButton = screen.getByText('More details');
    fireEvent.click(detailsButton);
    const favoriteCheckbox = screen.getByText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckbox);
    history.push('/favorites');
    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toBeInTheDocument();
  });
});
