import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('favoritePokemons', () => {
  it('Not Found', () => {
    renderWithRouter(<FavoritePokemons />); // testando o componente diretamente para não ter intervenção do localStorage
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
  it('favoritar', () => {
    renderWithRouter(<App />); // clico no primeiro pokemon assim que a página é renderizada
    const moreLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreLink);
    const namePoke = screen.getByTestId('pokemon-name');
    const checkButton = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(checkButton);
    const pageFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(pageFavorite);
    const nome = screen.getByTestId('pokemon-name');
    expect(namePoke).toEqual(nome);
  });
});
