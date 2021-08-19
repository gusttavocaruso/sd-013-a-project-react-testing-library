import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import Pokemons from '../data';

const { name, summary, foundAt } = Pokemons[0];
const linkText = 'More details';

describe('Requisito 7', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: linkText,
    }));

    const title = screen.getByRole('heading', {
      name: `${name} Details`,
    });
    expect(title).toBeInTheDocument();
    const detailsLink = screen.queryByRole('link', {
      name: 'More details',
    });
    expect(detailsLink).toBeFalsy();
    // https://jestjs.io/pt-BR/docs/expect#tobefalsy

    const summaryH2 = screen.getByRole('heading', {
      name: 'Summary',
    });
    expect(summaryH2).toBeInTheDocument();
    const summaryP = screen.getByText(summary);
    expect(summaryP).toBeInTheDocument();
  });

  it('Existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: linkText,
    }));

    const loc = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
    });
    expect(loc).toBeInTheDocument();
    const maps = screen.getAllByAltText(`${name} location`);
    expect(maps).toHaveLength(foundAt.length);
    foundAt.forEach((l, index) => {
      const srcMatch = maps[index].src === l.map;
      expect(srcMatch).toBeTruthy();
      const locationText = screen.getByText(l.location);
      expect(locationText).toBeInTheDocument();
    });
  });

  it('O usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: linkText }));

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox).not.toBeChecked();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).not.toBeChecked();
  });
});
