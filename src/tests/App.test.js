import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testando o componente App.js', () => {
  it('Deve conter o link "Home", "About" e "Favorite Pokémons"', () => {
    render(<App />);

    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFavoritePokemons = screen.getByRole('link', {
      name: /favorite pokemons/i,
    });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});
