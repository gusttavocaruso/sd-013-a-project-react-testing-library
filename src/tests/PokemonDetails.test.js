import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa PokemonDeatils', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const getMoreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(getMoreDetailsLink);
  });

  const { name, summary, foundAt } = pokemons[0];

  test('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const getPokemonTitle = screen.getByText(`${name} Details`);
    expect(getPokemonTitle).toBeInTheDocument();

    const getLinkMoreDetails = screen.queryByRole('link', { name: 'More details' });
    expect(getLinkMoreDetails).toBeNull();

    const getSummaryTitle = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(getSummaryTitle).toBeInTheDocument();

    const getSummaryParagraph = screen.getByText(summary);
    expect(getSummaryParagraph).toBeInTheDocument();
  });
  test('Testa se existe na página existem mapas dos habitats pokémons', () => {
    const getGameLocationText = screen.getByText(`Game Locations of ${name}`);
    expect(getGameLocationText).toBeInTheDocument();

    // pega todos os elementos pelo alt text name + location
    const getAllLocations = screen.getAllByAltText(`${name} location`);
    foundAt.forEach(({ location, map }, index) => {
      // usa o index do forEach para varrer o getAllLocations
      expect(getAllLocations[index]).toHaveAttribute('src', map);
      const getLocationText = screen.getByText(location);
      expect(getLocationText).toBeInTheDocument();
    });
  });
  test('Testa se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const getCheckBoxItem = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(getCheckBoxItem);
    expect(getCheckBoxItem).toBeChecked();

    userEvent.click(getCheckBoxItem);
    expect(getCheckBoxItem).not.toBeChecked();
  });
});
