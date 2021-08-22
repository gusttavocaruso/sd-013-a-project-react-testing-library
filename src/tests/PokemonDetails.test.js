import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helper/RenderWithRouter';
import App from '../App';

const path = '/pokemons/25';

describe('Testa o componente PokemonDetails.js', () => {
  test('se a página contém o nome do pokemon e more details está ausente', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByText(/more details/i);
    history.push(path);
    const pikachuTitle = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pikachuTitle).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });

  test('se existe um h2 com texo "Summary" e parágrafo com resumo', () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);
    const summary = screen.getByText(/summary/i);
    const paragraph = screen.getByText(/this intelligent Pokémon/i);
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Testa a seção de mapas do componente PokemonDetails.js', () => {
  test('se existe um h2 com texto "Game Locations of <name>"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);
    const pikachuTitle = screen.getByText(/Game Locations of pikachu/i);
    expect(pikachuTitle).toBeInTheDocument();
  });

  test('se as localizações dos pokemons são exibidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);
    const image = screen.getAllByRole('img');
    expect(image[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].alt).toBe('Pikachu location');
    expect(image[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(image[2].alt).toBe('Pikachu location');
  });
});

describe('Testa área de favoritar no componente PokemonDetails.js', () => {
  test('se existe e testa o campo checkbox', () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    const star = screen.getAllByRole('img');
    expect(star[1]).toBeInTheDocument();
    expect(star[1].src).toBe('http://localhost/star-icon.svg');
    fireEvent.click(favorite);
    expect(star[1]).not.toBeInTheDocument();
  });
});
