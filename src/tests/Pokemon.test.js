import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';

import App from '../App';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Requisito 6', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonPeso = screen.getByTestId('pokemon-weight');
    expect(pokemonPeso.innerHTML).toBe('Average weight: 6.0 kg');
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    const src = pokemonImg.src === 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(src).toBeTruthy();
    // https://jestjs.io/pt-BR/docs/expect#tobetruthy
  });

  it('Contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    expect(link.href).toBe('http://localhost/pokemons/25');
    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Check for favorite star icon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favPoke = screen.getByAltText('Pikachu is marked as favorite');
    expect(favPoke).toBeInTheDocument();
    expect(favPoke.src).toBe('http://localhost/star-icon.svg');
  });
});
