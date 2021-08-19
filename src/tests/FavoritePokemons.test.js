import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente FavoritePokemons.js', () => {
  it('É exibida na tela a mensagem "No favorite pokemon found"'
  + ', se não tiver pokemons favoritos', () => {
    renderWithRouter(<App />);

    const linkFavPokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(linkFavPokemon);

    const notFoundParagraph = screen.getByText(
      /no favorite pokemon found/i,
    );

    expect(notFoundParagraph).toBeInTheDocument();
  });

  it('')
});
