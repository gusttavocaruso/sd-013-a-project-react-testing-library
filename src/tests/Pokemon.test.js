import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente Pokemon', () => {
  test('Se é renderizado um card com informações do pokemon', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } showDetailsLink={ false } />,
    );
    const name = screen.getByText(/Pikachu/i);
    const stringName = name.textContent;
    const type = screen.getByText(/Electric/i);
    const average = screen.getByText(/average weight: 6.0 kg/i);
    const img = screen.getByAltText(`${stringName} sprite`);
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(average).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(pokemons[0].image);
  });

  test('Se o card do pokémon contem um link para detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
  });

  test('Se ao clicar no link de nav, é redirecionado para página de detalhes', () => {
    renderWithRouter(<App />);
    const name = screen.getByText(/Pikachu/i).textContent;
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const h2 = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Se a url é "/pokemons/id"', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Se existe um ícone de estrela nos pokémons favoritos', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite showDetailsLink />,
    );
    const name = screen.getByText(/Pikachu/i).textContent;
    const imgStar = screen.getByAltText(`${name} is marked as favorite`);
    expect(imgStar).toBeInTheDocument();
    expect(imgStar.src).toBe('http://localhost/star-icon.svg');
  });
});
