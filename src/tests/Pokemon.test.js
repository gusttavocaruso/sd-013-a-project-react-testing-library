import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
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

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(`${name}`);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(`${type}`);

    const avePokemon = screen.getByTestId('pokemon-weight');
    expect(avePokemon)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const imgPokemon = screen.getByRole('img', { name: `${name} sprite` });
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', `${image}`);
  });

  test('Se o id do pokemon indicado esta no link de navagação', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkSobre = screen.getByText('More details');
    expect(linkSobre).toBeInTheDocument();

    userEvent.click(linkSobre);

    const { location: { pathname } } = history;

    expect(pathname).toBe(`/pokemons/${id}`);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { name } = pokemons[0];
  test('O ícone deve ser uma imagem "/sta-icon.svg"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkDeails = screen.getByText(/more details/i);
    userEvent.click(linkDeails);

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);

    const url = 'http://localhost/star-icon.svg';
    const imagem = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(imagem.src).toBe(url);
  });
});
