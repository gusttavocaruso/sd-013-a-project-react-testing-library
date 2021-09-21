import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRoute from './renderWithRoute';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  const { name, foundAt } = pokemons[0];
  const moreDetails = 'More details';
  it('Testa se as opções do Pokemon selecionado é mostrado', () => {
    renderWithRoute(<App />);

    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const headingDetails = screen.getByRole('heading', {
      name: `${name} Details`,
    });
    expect(headingDetails).toBeInTheDocument('');
    const pageDetails = screen.queryByRole('link', {
      name: 'More details',
    });
    expect(pageDetails).toBeFalsy();
    const titleSumary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(titleSumary).toBeInTheDocument();
    const pokeDetails = screen.getByText(/This intelligent Pokémon/i);
    expect(pokeDetails).toBeInTheDocument();
  });
  test('Testa uma seção com os mapas com locação dos pokemons', () => {
    renderWithRoute(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const localDetails = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
    });
    expect(localDetails).toBeInTheDocument();
    const localPokemon = screen.getAllByAltText(`${name} location`);
    expect(localPokemon.length).toBe(foundAt.length);
    foundAt.forEach((location, i) => {
      expect(localPokemon[i].src).toBe(location.map);
      const localPokemonText = screen.getByText(location.location);
      expect(localPokemonText).toBeInTheDocument();
    });
  });

  test('Teste se o usuário consegue favoritar um poke através da página detalhes', () => {
    renderWithRoute(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const labelFavDetails = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavDetails).toBeInTheDocument();
  });
});
