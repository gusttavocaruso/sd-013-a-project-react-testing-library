import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

describe('Test App.js', () => {
  test('Teste se informações detalhadas do Pokémon são mostradas na tela.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }));
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });

  test('Teste se existe uma seção com mapas contendo as localizações do pokémon', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByRole('heading', {
      name: new RegExp(`Game Locations of ${pokemons[0].name}`, 'i'),
      level: 2,
    })).toBeInTheDocument();
    const locations = screen.getAllByAltText(`${pokemons[0].name} location`);
    pokemons[0].foundAt.forEach((pokemon, index) => {
      expect(screen.getByText(pokemon.location)).toBeInTheDocument();
      expect(locations[index].src).toContain(pokemon.map);
    });
  });
  test('Teste se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();

    const checkBox = screen.getByRole('checkbox');
    expect(checkBox).toBeInTheDocument();

    fireEvent.click(checkBox);
    const imgStar = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(imgStar.src).toContain('/star-icon.svg');

    fireEvent.click(checkBox);
    const linkFavorite = screen.getByRole('link', { name: /favorite/i });
    fireEvent.click(linkFavorite);
    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
});
