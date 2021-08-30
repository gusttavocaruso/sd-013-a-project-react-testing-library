import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pikachu = pokemons.find((pokemon) => pokemon.name === 'Pikachu');
const { id, name, type, averageWeight, image } = pikachu;

describe('Pokemon.js tests', () => {
  test('if pokemon renders', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } />);
    const pikachuName = screen.getByTestId('pokemon-name').innerHTML;
    expect(pikachuName).toStrictEqual(name);

    const pikachuType = screen.getByTestId('pokemon-type').innerHTML;
    expect(pikachuType).toStrictEqual(type);

    const pikachuWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(pikachuWeight)
      .toStrictEqual(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );

    const pikachuImage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pikachuImage.src).toStrictEqual(image);
    expect(pikachuImage.alt).toStrictEqual(`${name} sprite`);
  });
  test('if pokemon renders link', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails.href).toStrictEqual(`http://localhost/pokemons/${id}`);
  });
  test('if link redirects to more details', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pikachu } />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toStrictEqual(`/pokemons/${id}`);
  });
  test('if favorite pokemon has star', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ pikachu } />);
    const star = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(star).toBeInTheDocument();

    expect(star.src).toMatch(/star-icon.svg/i);

    expect(star.alt).toStrictEqual(`${name} is marked as favorite`);
  });
});
