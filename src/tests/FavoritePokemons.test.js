import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('FavoritePokemons component:', () => {
  it('should show \'No favorite pokemon found\' if there\'s no favorite', () => {
    render(<FavoritePokemons />);
    const notFound = screen.queryByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('should show all favorited pokemons', () => {
    const POKEMON_NAME = 'pokemon-name';
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.queryByRole('link', { name: 'More details' }));
    userEvent.click(screen.queryByRole('checkbox', { checked: false }));
    history.push('/favorites');
    const pokemon = screen.queryByTestId(POKEMON_NAME);
    expect(pokemon.textContent).toBe('Pikachu');

    history.push('/');
    userEvent.click(screen.queryByTestId('next-pokemon'));
    const charmander = screen.queryByTestId(POKEMON_NAME);
    expect(charmander).toBeInTheDocument();
    userEvent.click(screen.queryByRole('link', { name: 'More details' }));
    userEvent.click(screen.queryByRole('checkbox', { checked: false }));

    const favorite = screen.queryByTestId('pokemon-name');
    history.push('/favorites');
    expect(favorite.textContent).toBe('Charmander');
  });
});
