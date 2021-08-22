import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');

    const average = screen.getByTestId('pokemon-weight');
    expect(average).toHaveTextContent(/6.0 kg/i);

    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(url);
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
