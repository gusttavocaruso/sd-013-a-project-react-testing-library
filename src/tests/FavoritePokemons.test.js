import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Terceiro requisito: Favorite Pokémons', () => {
  it('Verifica se a mensagem "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  it('Verifica se todos os cards favoritados são exibidos', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(details);

    const favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteButton);

    const favoriteLink = screen.getByRole('link', { name: /Favorite/i });
    fireEvent.click(favoriteLink);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonImg.src).toStrictEqual(src);
    expect(pokemonImg).toBeInTheDocument();
  });
});
