import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);
const details = 'More Details';

describe('Testando o componente Pokemon Details', () => {
  it('As informações detalhadas dos pokemons aparecem na tela', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(details));

    const pokemonName = pokemons[0].name;
    const pokemonTitle = screen.getByText(`${pokemonName} Details`);
    expect(pokemonTitle).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summaryHeading).toBeInTheDocument();

    const { summary } = pokemons[0];
    const abstract = screen.getByText(summary);
    expect(abstract).toBeInTheDocument();
  });

  it('Testando a seção de localização', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(details));

    const pokemonName = pokemons[0].name;
    const locationHeader = screen.getByText(`Game Locations of ${pokemonName}`);
    expect(locationHeader).toBeInTheDocument();

    const pokemonLocations = pokemons[0].foundAt.length;
    const locationsFound = screen.getAllByAltText(`${pokemonName} location`);
    expect(pokemonLocations).toBe(locationsFound.length);

    const pokemonLocation = pokemons[0].foundAt[0];
    const imageLocation = locationsFound[0];
    expect(imageLocation.src).toBe(pokemonLocation.map);
  });

  it('Testando o campo que marca o pokemon como favorito', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(details));

    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();
  });
});
