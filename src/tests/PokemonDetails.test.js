import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('PokemonDetails.js Test', () => {
  const { name, foundAt, summary } = pokemons[0];
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Aplicação mostra as informações detalhadas na tela', () => {
    const infoLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(infoLink);

    const info = screen.getByRole('heading', { name: `${name} Details` });
    expect(info).toBeInTheDocument();
    expect(infoLink).not.toBeInTheDocument();

    const summ = screen.getByRole('heading', { name: /summary/i });
    expect(summ).toBeInTheDocument();

    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it('Aplicação mostra mapas com as localizações do Pokémon', () => {
    const locations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const info = screen.getByRole('link', { name: /more details/i });
    userEvent.click(info);

    const location = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(location).toBeInTheDocument();

    foundAt.forEach((item, index) => {
      const img = screen.getAllByRole('img', { name: `${name} location` });
      expect(img[index]).toHaveAttribute('src', item.map);
    });

    locations.forEach((item, index) => {
      expect(screen.getByText(item)).toBeInTheDocument();

      const img = screen.getAllByRole('img', { name: `${name} location` });
      expect(img[index]).toHaveAttribute('src', foundAt[index].map);
    });
  });

  it('Aplicação permite o usuário favoritar o Pokémon através da página', () => {
    const info = screen.getByRole('link', { name: /more details/i });
    userEvent.click(info);

    const checkFav = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkFav).toBeDefined();
    userEvent.click(checkFav);

    let favorited = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(checkFav);

    favorited = screen.queryByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).not.toBeInTheDocument();
    expect(screen.getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});
