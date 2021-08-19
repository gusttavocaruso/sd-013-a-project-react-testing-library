import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Test "Pokemon" component', () => {
  const MORE_DETAILS = 'More details';
  const { id, name, type, image,
    averageWeight: { value, measurementUnit } } = pokemons[0];

  it('Renders card containing pokemon informations', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(name);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(type);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokeImg = screen.getByAltText(`${name} sprite`);
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg.src).toBe(image);
  });

  it('Renders pokemon "More details" link', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: MORE_DETAILS });
    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });

  it('Tests "More details" link functioning', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Renders star icon when the pokemon is favorited', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(detailsLink);

    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const pokeFavoritedImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(pokeFavoritedImg.src).toBe('http://localhost/star-icon.svg');
  });
});
