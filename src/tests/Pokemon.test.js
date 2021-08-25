import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Pokemon } from '../components';
// import Pokemon from '../components/Pokemon';

describe('Pokemon.js tests', () => {
  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];
  it('verifica que o nome e tipo correto do pokemon renderiza', () => {
    renderWithRouter(<App />);

    const getNameById = screen.getByTestId('pokemon-name');
    expect(getNameById.innerHTML).toBe(name);

    const getTypeById = screen.getByTestId('pokemon-type');
    expect(getTypeById.innerHTML).toBe(type);
  });

  it('Verifica se o peso médio renderiza corretamente', () => {
    renderWithRouter(<App />);

    const getWeightById = screen.getByTestId('pokemon-weight');
    expect(getWeightById.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
  });

  it('verifica se a imagem renderiza e se existe um alt', () => {
    renderWithRouter(<App />);

    const getImageByAlt = screen.getByAltText(`${name} sprite`).src;
    expect(getImageByAlt).toBe(image);
  });

  it('Verifica se existe um"Link" com o texto "More details" e se funciona', () => {
    renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(getLink).toBeInTheDocument();
    userEvent.click(getLink);
    const details = screen.getByText('Pikachu Details');
    expect(details).toBeInTheDocument();
  });

  it('Verifica se o id da URL combina com o do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(getLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se existe uma estrela nos favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const getFavoriteByAlt = screen.getByAltText(`${name} is marked as favorite`);
    expect(getFavoriteByAlt).toBeDefined();
    const getImageSrc = getFavoriteByAlt.src;
    expect(getImageSrc).toBe('http://localhost/star-icon.svg');
  });
});
