import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const linkDetailsPokemon = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkDetailsPokemon);

    const h2PokemonDetails = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    expect(h2PokemonDetails).toBeInTheDocument();

    expect(linkDetailsPokemon).not.toBeInTheDocument();

    const h2PokemonSummary = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(h2PokemonSummary).toBeInTheDocument();

    const resumePokemon = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity/i,
    );
    expect(resumePokemon).toBeInTheDocument();
  });
});

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const linkDetailsPokemon = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkDetailsPokemon);

    const h2PokemonLocation = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(h2PokemonLocation).toBeInTheDocument();

    const allLocation = screen.getAllByAltText(/Pikachu location/i);
    expect(allLocation.length).toBe(2);
    expect(allLocation[0].src)
      .toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allLocation[1].src)
      .toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(allLocation[0]).toBeInTheDocument();
    expect(allLocation[1]).toBeInTheDocument();
  });

  test('Pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const linkDetailsPokemon = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkDetailsPokemon);

    const checkBoxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkBoxFavorite);

    const labelPokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(labelPokemon).toBeInTheDocument();
  });
});
