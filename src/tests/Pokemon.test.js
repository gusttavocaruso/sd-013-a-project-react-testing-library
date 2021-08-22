import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  const {
    name,
    type,
    averageWeight: {
      value,
      measurementUnit,
    },
    image,
  } = pokemons[0];

  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(`${name}`);

    const pokemontype = screen.getByTestId('pokemon-type');
    expect(pokemontype).toHaveTextContent(`${type}`);

    const pokemonaverage = screen.getByTestId('pokemon-weight');
    expect(pokemonaverage)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokemonimg = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonimg).toBeInTheDocument();
    expect(pokemonimg).toHaveAttribute('src', `${image}`);
  });
});

describe('Teste a rota do MoreDetails', () => {
  const {
    name,
    id,
  } = pokemons[0];
  it('Teste a URL quando clica no MoreDetails do pokemon', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const link = screen.getByText(/more details/i);
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
    expect(link).toBeDefined();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const link = screen.getByText(/more details/i);
    userEvent.click(link);
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);
    const imgFavorite = screen.getByRole('img', {
      name: `${name} is marked as favorite` });
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
