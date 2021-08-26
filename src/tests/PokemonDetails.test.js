import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito-7 - Testa o comportamento do componente <PokemonDetails />', () => {
  test('Testa se são mostradas as informações detalhadas do Pokemon escolhido.', () => {
    RenderWithRouter(<App />);

    const infoLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(infoLink);

    const title = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(title).toBeInTheDocument();
    expect(infoLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summary).toBeInTheDocument();

    const pokemonInfo = screen.getByText(`${pokemons[0].summary}`);
    expect(pokemonInfo).toBeInTheDocument();
  });

  test('Testa se existe uma seção de mapas na página,'
  + 'com a localização do pokemon.', () => {
    RenderWithRouter(<App />);

    const infoLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(infoLink);

    const locations = screen.getByRole('heading',
      {
        level: 2,
        name: 'Game Locations of Pikachu',
      });

    expect(locations).toBeInTheDocument();
    const mapsInfo = screen.getAllByAltText('Pikachu location');
    expect(mapsInfo.length).toBe(pokemons[0].foundAt.length);
    mapsInfo.forEach((image, index) => {
      expect(image).toHaveAttribute('src', pokemons[0].foundAt[index].map);
    });
  });

  test('Testa se é possível favoritar o pokemon pela página de detalhes.', () => {
    RenderWithRouter(<App />);

    const infoLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(infoLink);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    const labelOfCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelOfCheckbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const favorite = screen.getByAltText(/is marked as favorite/i);
    expect(favorite).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(favorite).not.toBeInTheDocument();
  });
});
