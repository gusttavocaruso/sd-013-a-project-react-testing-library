import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const {
  name,
  foundAt,
  summary,
} = pokemons[0];

const details = 'More details';

describe('Testa o componente PokemonDetails e suas funcionalidades', () => {
  it('Testa se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: details });
    userEvent.click(detailsLink);
    const nameDetails = screen.getByRole('heading', { name: `${name} Details` });
    expect(nameDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const getSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(getSummary).toBeInTheDocument();
    const paragraph = screen.getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });
  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: details });
    userEvent.click(detailsLink);
    const gameLocations = screen.getByRole('heading', { name:
      `Game Locations of ${name}` });
    expect(gameLocations).toBeInTheDocument();
    const locationsAll = screen.getAllByAltText(`${name} location`);
    expect(locationsAll).toHaveLength(foundAt.length);
    foundAt.forEach((found, index) => {
      expect(locationsAll[index]).toHaveAttribute('src', found.map);
      const getParagraph = screen.getByText(found.location);
      expect(getParagraph).toBeInTheDocument();
    });
  });
  it('Teste se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: details });
    userEvent.click(detailsLink);
    const getCheckbox = screen.getByRole('checkbox');
    expect(getCheckbox).toBeInTheDocument();
    userEvent.click(getCheckbox);
    expect(getCheckbox).toBeChecked();
    userEvent.click(getCheckbox);
    expect(getCheckbox).not.toBeChecked();
    const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheckbox).toBeInTheDocument();
  });
});
