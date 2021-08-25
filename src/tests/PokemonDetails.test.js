import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const MORE_DETAILS = 'More details';

describe('Testa se estão corretas as informações do Details', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se mostra as informações do pokémon', () => {
    const pokeLink = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(pokeLink);

    const pokeNameTitle = screen.getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    const pokeTitle = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const pokeParagraph = screen.getByText(/This intelligent Pokémon roasts/i);

    expect(pokeNameTitle).toBeInTheDocument();
    expect(pokeLink).not.toBeInTheDocument();
    expect(pokeTitle).toBeInTheDocument();
    expect(pokeParagraph).toBeInTheDocument();
  });

  test('Testa se há uma seção com os mapas', () => {
    const pokeLink = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(pokeLink);

    const pokeLocations = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    const mapsLocation = screen.getAllByAltText(/location/i);

    expect(mapsLocation).toHaveLength(2);
    expect(mapsLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsLocation[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(mapsLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapsLocation[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(pokeLocations).toBeInTheDocument();
  });

  test('Verifica o pókemon consegue ser favoritado', () => {
    const pokeLink = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(pokeLink);

    const pokeFavBox = screen.getByRole('checkbox');
    expect(pokeFavBox).toBeInTheDocument();

    const pokeBoxLabel = screen.getByText('Pokémon favoritado?');
    userEvent.click(pokeFavBox);

    const pokeFavMark = screen.getByAltText(/is marked as favorite/i);
    expect(pokeFavMark).toBeInTheDocument();

    userEvent.click(pokeFavBox);
    expect(pokeFavMark).not.toBeInTheDocument();

    expect(pokeBoxLabel).toBeInTheDocument();
  });
});
