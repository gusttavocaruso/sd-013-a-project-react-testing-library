import React from 'react';
import { screen, userEvent } from './index';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => renderWithRouter(<App />));

  const {
    name,
    foundAt,
    summary,
  } = pokemons[0];

  it('Se as infos detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    const pokeName = screen.getByText(`${name} Details`);

    expect(heading).toBeInTheDocument();
    expect(pokeName).toBeInTheDocument();

    const summaryResume = screen.getByText(summary);
    expect(summaryResume).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas', () => {
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();

    const location = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });

    expect(location).toBeInTheDocument();

    foundAt.forEach((item, index) => {
      const image = screen.getAllByRole('img', {
        name: `${name} location`,
      });

      expect(image[index]).toHaveAttribute('src', item.map);
      expect(image[index]).toHaveAttribute('alt', `${name} location`);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();

    // checkbox de favorito
    const favoriteCheck = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    userEvent.click(favoriteCheck);

    // estrelinha de favoritado 
    const star = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    // verifico se ela está sendo renderizada
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
