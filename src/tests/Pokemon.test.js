import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokename = screen.getByTestId('pokemon-name');
    expect(pokename.innerHTML).toBe('Pikachu');

    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.innerHTML).toBe('Electric');

    const weightPoke = screen.getByTestId('pokemon-weight');
    expect(weightPoke.innerHTML).toBe('Average weight: 6.0 kg');

    const imgPoke = screen.getByAltText('Pikachu sprite');
    expect(imgPoke).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPoke).toHaveAttribute('alt', 'Pikachu sprite');
  });
});
