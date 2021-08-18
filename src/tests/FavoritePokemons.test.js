import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const zeroFavorite = screen.getByText('No favorite pokemon found');
    expect(zeroFavorite).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favPikachu = screen.getByRole('checkbox');
    fireEvent.click(favPikachu);
    history.push('/pokemons/4');
    const favCharmander = screen.getByRole('checkbox');
    fireEvent.click(favCharmander);
    history.push('/favorites');
    const pikachu = screen.getByText(/pikachu/i);
    const charmander = screen.getByText(/charmander/i);
    const arrayFavorite = screen.getAllByText(/average/i);
    expect(pikachu && charmander).toBeInTheDocument();
    expect(arrayFavorite.length).toBe(2);
  });
});
