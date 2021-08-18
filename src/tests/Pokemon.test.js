import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pikachuLink = '/pokemons/25';

describe('Testa o componente Pokemon.js', () => {
  it('Testa se o card mostra as informações corretas', () => {
    renderWithRouter(<App />);
    // No código abaixo, clico no tipo normal e espero que o nome, tipo e peso do pokémon que aparece estejam corretos.
    const normalTypeButton = screen.getByRole('button', { name: 'Normal' });
    fireEvent.click(normalTypeButton);
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe('Snorlax');
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe('Normal');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent('Average weight:');
    expect(pokeWeight).toHaveTextContent('kg');
    const pokeImg = screen.getByAltText('Snorlax sprite');
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
    expect(pokeImg).toBeInTheDocument();
  });
  it('Testa se existe o link para os detalhes do pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toHaveAttribute('href', pikachuLink);
  });
  it('Testa se esse link me leva para a página de detalhes do pokémon certo', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(link);
    expect(history.location.pathname).toBe(pikachuLink);
  });
  it('Testa se uma estrela aparece no card do pokémon após ele ser favoritado', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuLink);
    const favoriteCheckbox = screen.getByText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckbox);
    history.push('/');
    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar).toBeInTheDocument();
  });
});
