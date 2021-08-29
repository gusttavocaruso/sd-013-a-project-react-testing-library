import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';
import { FavoritePokemons } from '../components';

describe('Testing Pokemon.js', () => {
  test('testing card render', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
    expect(screen.getAllByText(pokemons[0].type)).toHaveLength(2);
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    expect(screen.getByText(
      `Average weight: ${value} ${measurementUnit}`,
    )).toBeInTheDocument();
    const photo = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(photo.src).toContain(pokemons[0].image);
  });

  test('testing the redirect to details page', () => {
    const historyMock = createMemoryHistory();
    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );
    const details = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(details);
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
  });

  test('testing link card', () => {
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

  test('', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </BrowserRouter>,
    );
    const photo = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(photo.src).toContain('/star-icon.svg');
    expect(photo.alt).toContain(`${pokemons[0].name} is marked as favorite`);
  });
});
