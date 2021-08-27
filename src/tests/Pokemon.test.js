import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Test Pokemon.js', () => {
  test('Teste se renderiza um card com as informações de determinado pokémon.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
    expect(screen.getAllByText(pokemons[0].type)).toHaveLength(2);
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    expect(screen.getByText(`Average weight: ${value} ${measurementUnit}`))
      .toBeInTheDocument();
    const img = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(img.src).toContain(pokemons[0].image);
  });

  test('Teste se o card do Pokémon contém um link de details', () => {
    const historyMock = createMemoryHistory();

    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );
    expect(screen.getByRole('link', { name: /more details/i })).toBeInTheDocument();

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
  });

  test('A imagem deve ter o alt igual a <pokemon> is marked as favorite', () => {
    const historyMock = createMemoryHistory();
    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );
    historyMock.push(`/pokemon/${pokemons[0].id}`);
    const { entries } = historyMock;
    expect(entries[1].pathname).toEqual(`/pokemon/${pokemons[0].id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </BrowserRouter>,
    );
    const imgStar = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(imgStar.src).toContain('/star-icon.svg');
    expect(imgStar.alt).toContain(`${pokemons[0].name} is marked as favorite`);
  });
});
