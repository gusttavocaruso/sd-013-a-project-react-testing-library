import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Pokemon Details', () => {
  it('Checagem dos textos', () => {
    renderWithRouter(<App />);
    const LinkDetails = screen.getByRole('link',
      { name: /more details/i });
    userEvent.click(LinkDetails);
    const heading = screen.getByRole('heading', { name: /pikachu Details/i, level: 2 });
    const sumary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const Locations = screen.getByRole('heading',
      { name: /Game Locations of pikachu/i, level: 2 });
    const paragrafo = screen.getByText(/Pokémon roasts hard berries with electricity/i);
    expect(heading).toBeInTheDocument();
    expect(sumary).toBeInTheDocument();
    expect(Locations).toBeInTheDocument();
    expect(paragrafo).toBeInTheDocument();
    expect(LinkDetails).not.toBeInTheDocument();
  });
  it('Checagem das imagens', () => {
    renderWithRouter(<App />);
    const LinkDetails = screen.getByRole('link',
      { name: /more details/i });
    userEvent.click(LinkDetails);
    const images = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(images[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const fav = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(fav);
    const estrela = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(estrela).toBeInTheDocument();
    userEvent.click(fav);
    expect(estrela).not.toBeInTheDocument();
  });
});
