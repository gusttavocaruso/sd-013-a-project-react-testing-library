import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

describe('Testing PokemonDetails.js', () => {
  test('testing the text with pokemons names', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const details = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(details);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });

  test('testing pokemon map', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByRole('heading', {
      name: new RegExp(`game locations of ${pokemons[0].name}`, 'i'),
      level: 2,
    })).toBeInTheDocument();

    const pokemonLocation = screen.getAllByAltText(`${pokemons[0].name} location`);
    pokemons[0].foundAt.forEach((pokemon, index) => {
      expect(screen.getByText(pokemon.location)).toBeInTheDocument();
      expect(pokemonLocation[index].src).toContain(pokemon.map);
    });
  });

  test('', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const favoritChecked = screen.getByRole('checkbox');
    expect(favoritChecked).toBeInTheDocument();
    fireEvent.click(favoritChecked);
    const star = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(star.src).toContain('/star-icon.svg');
    fireEvent.click(favoritChecked);
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    const favorite = screen.getByRole('link', { name: /favorite/i });
    fireEvent.click(favorite);
    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
});
