import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokemon.js Test', () => {
  const {
    id,
    name,
    type,
    averageWeight: {
      value,
      measurementUnit,
    },
    image,
  } = pokemons[0];

  it('Aplicação contém card com informações do Pokémon', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });

  it('Card contém link funcional para detalhes adicionais', () => {
    const { history } = renderWithRouter(<App />);
    const infomon = screen.getByRole('link', { name: /more details/i });

    expect(infomon).toBeDefined();
    userEvent.click(infomon);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Card contém indicador de favoritado', () => {
    renderWithRouter(<App />);

    const infomon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(infomon);

    const checkFav = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkFav).toBeDefined();
    userEvent.click(checkFav);

    const favmon = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favmon).toBeDefined();
    userEvent.click(favmon);

    const favImg = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
