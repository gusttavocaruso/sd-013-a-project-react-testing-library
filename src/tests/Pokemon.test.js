// Código realizado com ajuda de Matheus Duarte que postou no Notios da BeeDevs

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

const pathName = '/pokemons/25';

describe('Testa se o card é renderizado com as informações corretas do Pokémon', () => {
  // Utiliza-se o beforeEach para não precisar renderizar o componente em todos os testes

  test('Informações do Pokémon', () => {
    renderWithRouter(<App />);
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByAltText('Charmander sprite');

    expect(pokeName).toHaveTextContent('Charmander');
    expect(pokeType).toHaveTextContent('Fire');
    expect(pokeWeight).toHaveTextContent('Average weight: 8.5 kg');
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  test('Informações do botão', () => {
    renderWithRouter(<App />);
    const pokeLink = screen.getByRole('link', { name: 'More details' });
    expect(pokeLink).toHaveAttribute('href', pathName);
  });

  test('Click button', () => {
    const { id } = pokemons[0];
    // Pego o primeiro pokemon do array pokemons de data quando ele ainda ñ está favoritado ainda com history zerado
    const { history } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );

    const pokeLink2 = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokeLink2);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Verifica o pókemon consegue ser favoritado', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pathName);

    const pokeFav = screen.getByText('Pokémon favoritado?');
    userEvent.click(pokeFav);

    history.push('/');
    const pokeStar = screen.getByAltText('Pikachu is marked as favorite');

    expect(pokeStar).toHaveAttribute('src', '/star-icon.svg');
    expect(pokeStar).toBeInTheDocument();
  });
});
