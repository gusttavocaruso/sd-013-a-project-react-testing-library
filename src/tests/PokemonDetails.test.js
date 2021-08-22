import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonDate from '../data';
import App from '../App';

describe('', () => {
  const { name, foundAt, summary } = pokemonDate[0];
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Verifica informações detalhadas do Pokémon mostradas na tela. ', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const pokeDetails = screen.getByRole('heading', { name: `${name} Details` });
    expect(pokeDetails).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { name: /summary/i });
    expect(headingSummary).toBeInTheDocument();

    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it('Verifica uma seção com os mapas contendo as localizações do pokémon', () => {
    const locations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const mapLocation = screen.getByRole('heading',
      { name: `Game Locations of ${name}` });
    expect(mapLocation).toBeInTheDocument();

    foundAt.forEach((item, index) => {
      const imgs = screen.getAllByRole('img',
        { name: `${name} location` });

      expect(imgs[index]).toHaveAttribute('src', item.map);
    });

    locations.forEach((item, index) => {
      expect(screen.getByText(item)).toBeInTheDocument();
      const imgs = screen.getAllByRole('img',
        { name: `${name} location` });

      expect(imgs[index]).toHaveAttribute('src', foundAt[index].map);
    });
  });

  it('Verifica se o usuário pode favoritar um pokémon em details', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkBox = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkBox).toBeDefined();
    userEvent.click(checkBox);

    let favorited = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(checkBox);

    favorited = screen.queryByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).not.toBeInTheDocument();

    expect(screen.getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});
