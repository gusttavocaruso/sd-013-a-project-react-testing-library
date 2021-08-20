import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from './mocks/dataFavorite';
import renderWithRouter from './util/renderWithRouter';

describe('Teste o componente <Pokedex.js />.', () => {
  it('A página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 23: false, 65: true } } />);
    const h2 = screen.queryByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
    expect(h2).toContainHTML('</h2>');
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 23: false, 65: true } } />);
    const nextPokemonBtn = screen.queryByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonBtn).toHaveAttribute('type', 'button');
    expect(nextPokemonBtn).toHaveAttribute('class', 'button-text pokedex-button');
    const pokemonFIRST = screen.queryByTestId('pokemon-name');
    expect(pokemonFIRST).toHaveTextContent(/Ekans/i);
    fireEvent.click(screen.queryByRole('button', { name: /Próximo pokémon/i }));
    const pokemonSECOND = screen.queryByTestId('pokemon-name');
    expect(pokemonSECOND).toHaveTextContent(/Alakazam/i);
    fireEvent.click(screen.queryByRole('button', { name: /Próximo pokémon/i }));
    expect(screen.queryByTestId('pokemon-name')).toBe(pokemonFIRST);
  });
});
