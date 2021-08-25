import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testa se é rende4rizado um card.', () => {
  test('Testa o nome correto do Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toContain('Pikachu');
  });

  test('testa o tipo correto do Pokémon;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');
  });

  test('Testa o peso médio do Pokemon;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth.textContent).toBe('Average weight: 6.0 kg');
  });

  test('Testa a imagem do Pokemon exibida.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokeImg = screen.getByRole('img');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe('Pikachu sprite');
  });
});

describe('Testa interações com o card de Pokemon.', () => {
  test('Testa se existe um link para os detalhes do pokémon;', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const detailsLink = screen.getByText(/More Details/i);
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const isFavorited = screen.getByAltText('Pikachu is marked as favorite');

    expect(isFavorited.src).toBe('http://localhost/star-icon.svg');
    expect(isFavorited.alt).toBe('Pikachu is marked as favorite');
  });
});
