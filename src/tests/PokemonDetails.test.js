import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokedex from '../data';

describe('PokemonDetails.js tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
  test('Verifica as informações detalhadas do pokémon', () => {
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const pokeDetails = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(pokeDetails).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();

    const pokeInfo = screen.getByText(`${pokedex[0].summary}`);
    expect(pokeInfo).toBeInTheDocument();
  });
  test('Verifica se há um mapa com a localização do pokémon', () => {
    const headLocation = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokedex[0].name}`,
    });
    expect(headLocation).toBeInTheDocument();

    const pokeLocation = screen.getAllByAltText(`${pokedex[0].name} location`);
    expect(pokeLocation.length).toBe(pokedex[0].foundAt.length);

    // peguei essa com o matheus duarte.
    pokeLocation.forEach((img, i) => {
      expect(img).toHaveAttribute('src', pokedex[0].foundAt[i].map);
    });
  });
  test('Verifica se o usuário pode favoritar pokémon', () => {
    const favoriteBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteBox).toBeInTheDocument();

    const favoriteLabel = screen.getByLabelText(/pokémon favoritado\?/i);
    expect(favoriteLabel).toBeInTheDocument();

    // https://stackoverflow.com/questions/55177928/how-do-you-check-a-checkbox-in-react-testing-library

    userEvent.click(favoriteBox);

    expect(favoriteBox.checked).toEqual(true);

    userEvent.click(favoriteBox);

    expect(favoriteBox.checked).toEqual(false);
  });
});
