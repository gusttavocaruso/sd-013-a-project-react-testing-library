import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../render-router';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Pokemon test', () => {
  test('Testa se o nome do Pokémon esta correto', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const namePok = screen.getByTestId('pokemon-name');
    expect(namePok.textContent).toContain('Pikachu');
  });

  test('Testa se é mostrado o tipo correto na tela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const tipoPok = screen.getByTestId('pokemon-type');
    expect(tipoPok.textContent).toBe('Electric');
  });

  test('Testa o peso do Pokemon;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const pesoPok = screen.getByTestId('pokemon-weight');
    expect(pesoPok.textContent).toBe('Average weight: 6.0 kg');
  });

  test('Testa se a imagem do Pokemon exibida.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const imagePok = screen.getByRole('img');
    expect(imagePok.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePok.alt).toBe('Pikachu sprite');
  });

  test('Testa se existe um link para os detalhes do pokémon', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const linkDetalhes = screen.getByText(/More Details/i);
    expect(linkDetalhes).toBeInTheDocument();
    fireEvent.click(linkDetalhes);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const estrelaFavorit = screen.getByAltText('Pikachu is marked as favorite');
    expect(estrelaFavorit.src).toBe('http://localhost/star-icon.svg');
    expect(estrelaFavorit.alt).toBe('Pikachu is marked as favorite');
  });
});

// Requesito feito com ajuda de Cleyton Renê.
