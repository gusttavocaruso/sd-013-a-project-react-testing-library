import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const moreD = 'More details';

describe('Testa o componente PokemonDetails.js', () => {
  it('Testa se a página contem os componentes necessarios', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreD });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const header = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(header).toBeInTheDocument();
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
    const summaryP = screen.getByText(/This intelligent Pokémon/i);
    expect(summaryP).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });
  it('Testa se existe uma seção com os mapas onde esse pokémon se encontra', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreD });
    fireEvent.click(link);
    const mapsHeader = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(mapsHeader).toBeInTheDocument();
    const images = screen.getAllByAltText(/location/);
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  it('Testa a checkbox de favoritar o pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreD });
    fireEvent.click(link);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    const checkboxText = screen.getByText('Pokémon favoritado?');
    expect(checkboxText).toBeInTheDocument();
    fireEvent.click(checkbox);
    const favoriteStar = screen.getByAltText(/is marked as favorite/i);
    expect(favoriteStar).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(favoriteStar).not.toBeInTheDocument();
  });
});
