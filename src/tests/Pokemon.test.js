import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe(`1. Test if it is rendered a
card with the informations of determinated pokemon`, () => {
  it('The correct pokemon name must be shown in the screen', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(pokemons[0].name);
  });
  it('The correct pokemon type must be shown in the screen', () => {
    renderWithRouter(<App />);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(pokemons[0].type);
  });
  it('The avarage pokemon weight must be shown with a text.', () => {
    renderWithRouter(<App />);
    const { averageWeight } = pokemons[0];
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
  });
  it(`The pomekon image must be shown. It must to contain a src attribute with the img
   URL and a alt attribute`, () => {
    renderWithRouter(<App />);
    const pokeImg = screen.getByAltText(/pikachu sprite/i);
    expect(pokeImg).toHaveAttribute('src', `${pokemons[0].image}`);
    expect(pokeImg.alt).toBe(`${pokemons[0].name} sprite`);
  });
});
describe(`2. Test if the pokemon card indicated in the pokedex contains
 a nav link to show details this pokemon`, () => {
  it(`The link must have the URL "/pokemons/id",
   where "<id>" is the pokemon showed`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /More details/i,
    });

    expect(link).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });
});
describe(`3. Test if to click onto pokemon nav link, it's
 done the application redirecting to the pokemon details page`, () => {
  it('Test the link to page details', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(link);
    const summary = screen.getByText(/Summary/i);
    expect(summary).toBeInTheDocument();
  });
  it('test as well if the URL showed in the nav change to /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(link);
    const { location: { pathname } } = history;
    const id = pathname;

    expect(id).toBe(`/pokemons/${pokemons[0].id}`);
  });
});
describe('Tesdt if exists a star icon in the favorite pokemon', () => {
  it(`The icon must be a image with
   src attribute containing the path /star-icon.svg`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const toFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(toFavorite);

    const star = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);

    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
