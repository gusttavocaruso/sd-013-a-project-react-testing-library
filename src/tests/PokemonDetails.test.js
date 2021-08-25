import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a pokemonDetails.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  test('Testa se as infos detalhadas são mostradas', () => {
    const getDetails = screen.getByRole('heading', { name: /details/i });
    const getPokemon = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const summaryP = screen.getByText(/berries with electricity/i);
    const getDetailsLink = screen.queryByRole('link', { name: /more details/i });

    expect(getDetails).toBeInTheDocument();
    expect(getPokemon).toBeInTheDocument();
    expect(summaryP).toBeInTheDocument();
    expect(getDetailsLink).not.toBeInTheDocument();
  });
  test('Testa se existem os mapas na página', () => {
    const getHeadingLocal = screen.getByRole('heading', {
      name: /game locations of/i,
    });
    const getLocations = screen.getAllByText(/kanto/i);
    const getImages = screen.getAllByAltText(/location/i);
    const url = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(getHeadingLocal).toBeInTheDocument();
    expect(getLocations.length).toBe(2);
    expect(getLocations[0]).toBeInTheDocument();
    expect(getLocations[1]).toBeInTheDocument();
    expect(getImages[0].src).toBe(url);
    expect(getImages[1].src).toBe(url2);
  });
  test('Testa se um usuário pode favoritar através dos detalhes', () => {
    const getFavorite = screen.getByRole('checkbox', /pokémon favoritado?/i);
    fireEvent.click(getFavorite);
    expect(getFavorite).toBeInTheDocument();
    expect(getFavorite.type).toBe('checkbox');

    const isFavorited = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(isFavorited).toBeInTheDocument();
  });
});
