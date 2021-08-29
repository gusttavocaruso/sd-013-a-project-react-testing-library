import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

describe('Teste PokemonsDetails', () => {
  test('Teste se informações detalhadas do Pokémon são mostradas na tela.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const link = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(link);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });

  test('Teste se existe uma seção com mapas contendo as localizações do pokémon', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByRole('heading', {
      name: new RegExp(`game locations of ${pokemons[0].name}`, 'i'),
      level: 2,
    })).toBeInTheDocument();

    const img = screen.getAllByAltText('Pikachu location');
    pokemons[0].foundAt.forEach((pokemon, i) => {
      expect(screen.getByText(pokemon.location)).toBeInTheDocument();
      expect(img[i].src).toContain(pokemon.map);
    });
  });

  test('Teste se o usuário pode favoritar um pokémon.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const checked = screen.getByRole('checkbox');
    expect(checked).toBeInTheDocument();
    fireEvent.click(checked);
    const image = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(image.src).toContain('/star-icon.svg');
    fireEvent.click(checked);
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    const linkFavorite = screen.getByRole('link', { name: /favorite/i });
    fireEvent.click(linkFavorite);
    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
});
