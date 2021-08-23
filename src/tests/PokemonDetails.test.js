import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7 - Verificando funcionamento do '
 + 'componente <PokemonDetails />', () => {
  it('Verirfica se as informações detalhadas do Pokémon'
    + ' selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetails);

    const titleH2 = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(titleH2).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();

    const summaryH2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryH2).toBeInTheDocument();

    const pInfo = screen.getByText(`${pokemons[0].summary}`);
    expect(pInfo).toBeInTheDocument();
  });

  it('Verirfica se existe na página uma seção'
    + ' com os mapas contendo as localizações do pokémon.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetails);

    const locations = screen.getByRole('heading',
      {
        level: 2,
        name: 'Game Locations of Pikachu',
      });

    expect(locations).toBeInTheDocument();

    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps.length).toBe(pokemons[0].foundAt.length);

    maps.forEach((image, index) => {
      expect(image).toHaveAttribute('src', pokemons[0].foundAt[index].map);
    })
  });
});
