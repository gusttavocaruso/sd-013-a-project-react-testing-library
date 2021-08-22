import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('Testando o componente Pokemon', () => {
  it('Testando se é renderizado um card com os dados do Pokemon', () => {
    renderWithRouter(<App />);

    const pokemonFound = screen.getByTestId('pokemon-name').innerHTML;
    const pokemonName = pokemons[0].name;
    expect(pokemonFound).toBe(pokemonName);

    const typeFound = screen.getByTestId('pokemon-type').innerHTML;
    const pokemonType = pokemons[0].type;
    expect(typeFound).toBe(pokemonType);

    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    const { value, measurementUnit } = pokemons[0].averageWeight;
    expect(pokemonWeight).toBe(`Average weight: ${value} ${measurementUnit}`);

    const pathFound = screen.getByRole('img');
    const pokemonImage = pokemons[0].image;
    expect(pathFound.src).toBe(pokemonImage);
    expect(pathFound.alt).toBe(`${pokemonName} sprite`);
  });
  it('Testando se o card possui um link com mais detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonId = pokemons[0].id;

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();
    fireEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemonId}`);
  });
  it('Testando se existe uma estrela nos pokemons favoritos', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);

    const favorite = screen.getByText('Pokémon favoritado?');
    fireEvent.click(favorite);

    const linkHome = screen.getByText('Home');
    fireEvent.click(linkHome);

    const getImg = screen.getByRole('img', { name: /is marked/i });
    expect(getImg).toBeInTheDocument();
    expect(getImg.src).toBe('http://localhost/star-icon.svg');

    const pokemonName = pokemons[0].name;
    expect(getImg.alt).toBe(`${pokemonName} is marked as favorite`);
  });
});
