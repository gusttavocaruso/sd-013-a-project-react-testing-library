import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando Componente Pokemon:', () => {
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

  test('Testa se renderiza um card com as info do Pokemon.', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });

  test('Testa se o card possui um link para os detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(pokeDetails).toBeDefined();
    userEvent.click(pokeDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se existe uma estrela para os Pokemons favoritos.', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeDetails);
    const favBox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(favBox);
    const starIcon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
