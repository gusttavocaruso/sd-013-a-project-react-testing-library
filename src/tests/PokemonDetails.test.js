import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente PokemonDetails', () => {
  const { name, foundAt } = Pokemons[0];
  const moreDetails = 'More details';
  it('Teste: as infos detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const titleDetails = screen.getByRole('heading', {
      name: `${name} Details`,
    });
    expect(titleDetails).toBeInTheDocument();
    const linkPageDetails = screen.queryByRole('link', {
      name: 'More details',
    });
    expect(linkPageDetails).toBeFalsy();
    const sumaryTitle = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(sumaryTitle).toBeInTheDocument();
    const pokemonDetails = screen.getByText(/This intelligent Pokémon/i);
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Teste existe na page uma seção com os mapas contendo as localiz do pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const mapDetails = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
    });
    expect(mapDetails).toBeInTheDocument();
    const locationPokemon = screen.getAllByAltText(`${name} location`);
    expect(locationPokemon.length).toBe(foundAt.length);
    foundAt.forEach((location, index) => {
      expect(locationPokemon[index].src).toBe(location.map);
      const locationPokemonText = screen.getByText(location.location);
      expect(locationPokemonText).toBeInTheDocument();
    });
  });
  it('Teste o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const labelFavoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavoritePokemon).toBeInTheDocument();
  });
});
