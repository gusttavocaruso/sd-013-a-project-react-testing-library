import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../types/renderWithRouter';
import App from '../App';

describe('Testa componente PokemonDetails', () => {
  test('Testa um card com as informações e mais detales de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(/electric/i);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();

    const pokeImg = screen.getByRole('img');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe('Pikachu sprite');
  });

  test('Testa se o card de pokemon contem um link More Details', () => {
    renderWithRouter(<App />);

    const pokeDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokeDetails).toBeInTheDocument();
  });

  test('Testa se More Details redireciona e se PathName está correto', () => {
    const { history } = renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsButton);

    const detailsHeader = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(detailsHeader).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pokemons/25');

  const favPokeCheckBox = screen.getByRole('checkbox');
  userEvent.click(favPokeCheckBox);

  history.push('/');

  const starIcon = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(starIcon.src).toContain('/star-icon.svg');
  expect(starIcon.alt).toBe('Pikachu is marked as favorite');
});
