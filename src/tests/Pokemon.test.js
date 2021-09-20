import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Component Pokemon:', () => {
  renderWithRouter(<App />);
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

  test('Teste se é renderizado um card com as informações do pokémon.', () => {
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });

  test('Teste se o card do Pokémon contém um link de navegação para os detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(pokeDetails).toBeDefined();
    fireEvent.click(pokeDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    const favCheckBox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(favCheckBox);

    const starIcon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
