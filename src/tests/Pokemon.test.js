import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

import App from '../App';
import pokemons from '../data';

const detailsLink = () => screen.getByRole('link', { name: 'More details' });

describe('Verificando o funcionamento do componente <Pokemon />', () => {
  test(`Verifica o card com as seguintes informações do Pokémon: 
  nome, tipo, peso e sua imagem.`, () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    const img = screen.getByRole('img');

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('Verifica se o card contém um link para sua página de detalhes', () => {
    renderWithRouter(<App />);

    const { id } = pokemons[0];

    expect(detailsLink()).toBeInTheDocument();
    expect(detailsLink()).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test(`Verifica o clique no link para a página de detalhes de um Pokémon, 
  é o redirecionamento para esta página`, () => {
    const { historyMock } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );

    const { id } = pokemons[0];

    userEvent.click(detailsLink());
    expect(historyMock.location.pathname).toEqual(`/pokemons/${id}`);
  });

  test(`Verifica se existe um Pokémons favorito, 
  e se é feito o redirecionamento para esta página`, () => {
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );

    const star = screen.getByRole('img', { name: /marked as favorite/ });
    expect(star).toBeInTheDocument();
    expect(star.src).toMatch(/star-icon.svg/);
    expect(star.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
