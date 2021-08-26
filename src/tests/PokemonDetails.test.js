import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

// beforeEach(() => {
// renderWithRouter(<App />);

// const linkMoreDetails = screen.getByRole('link', {
//   name: /more details/i,
// });
// userEvent.click(linkMoreDetails);
// });

describe('Testando o componente PokemonDetails.js', () => {
  it('Página deve ter texto "nome-do-pokemon Details"', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const h2 = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Não deve ter o link de navegação para os detalhes do pokemon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    expect(linkMoreDetails).not.toBeInTheDocument();
  });

  it('Na seção de dealhes deve conter um heading h2 com o texto "Summary"'
  + 'e o summary deve ser visualizado na tela', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const h2Summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    const summary = screen.getByText(pokemons[0].summary);

    expect(h2Summary).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });

  it('Deve ter um h2 com o texto "Game Locations of nome-do-pokemon"', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const h2Map = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
    });

    expect(h2Map).toBeInTheDocument();
  });

  it('Todas as localizações do pokemon devem estar na tela', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const pokemonLocations = pokemons[0].foundAt;
    const imgLocations = screen.getAllByRole('img', {
      name: `${pokemons[0].name} location`,
    });

    pokemonLocations.forEach(({ location, map }, index) => {
      const locationText = screen.getByText(location);

      expect(imgLocations[index].src).toBe(map);
      expect(imgLocations[index].alt).toBe(`${pokemons[0].name} location`);
      expect(locationText).toBeInTheDocument();
    });
  });

  it('O usuário pode favoritar o pokémon na página de detalhes', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const checkBoxFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
      checked: false,
    });

    expect(checkBoxFavorite).toBeInTheDocument();
    expect(checkBoxFavorite.checked).toBe(false);

    userEvent.click(checkBoxFavorite);
    expect(checkBoxFavorite.checked).toBe(true);
    userEvent.click(checkBoxFavorite);
    expect(checkBoxFavorite.checked).toBe(false);
  });
});
