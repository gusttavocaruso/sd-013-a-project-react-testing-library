import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const { name, summary, foundAt } = Pokemons[0];

describe('Teste o componente `<PokemonDetails.js />', () => {
  it(' Teste informações renderizadas em "More Details"', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const title = screen.getByRole('heading', { name: `${name} Details` });
    const titleSummary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const summaryText = screen.getByText(summary);

    expect(title).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(titleSummary).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const localizationTitle = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(localizationTitle).toBeInTheDocument();

    const maps = screen.getAllByAltText(`${name} location`);
    expect(maps.length).toBe(foundAt.length);

    foundAt.forEach((infoFound, index) => {
      const srcImage = maps[index].src === infoFound.map;
      expect(srcImage).toBe(true);

      const locationText = screen.getByText(infoFound.location);
      expect(locationText).toBeInTheDocument();
    });
  });

  it(' Teste se pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const clickCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(clickCheckbox).toBeInTheDocument();
    expect(clickCheckbox).not.toBeChecked();
    userEvent.click(clickCheckbox);
    expect(clickCheckbox).toBeChecked();
  });
});
