import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testar o componente PokemonDetails', () => {
  // código referência:https://www.notion.so/Projeto-Testes-em-React-332f9886963a4491bf58da84a11f1a6b
  test('Página contem <name> details', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(link);

    // Verifica titulo h2 da página é 'Pikachu Details'
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(title).toBeInTheDocument();

    // Dentro de details o link para lá não pode existir
    expect(link).not.toBeInTheDocument();

    // Espera-se que o título do sumário exista nesta página
    const summaryH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryH2).toBeInTheDocument();

    // Espera-se que o texto sumário do pikachu esteja nesta página
    const pInfo = screen.getByText(`${pokemons[0].summary}`);
    expect(pInfo).toBeInTheDocument();
  });
  test('existência da seção com mapas contendo as localizações dos pokemons', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(link);
    // Verifica titulo h2 da página é Game Locations of pokemon'
    const titleLocations = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(titleLocations).toBeInTheDocument();
    const pokemonMap = screen.getAllByAltText('Pikachu location')[0];
    const src = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(
      pokemonMap.src,
    ).toBe(src);
    expect(pokemonMap.alt).toBe('Pikachu location');
  });
  test('Se o usuário pode favoritar', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(link);
    const checkboxFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(checkboxFavorite).toBeInTheDocument();
  });
});
