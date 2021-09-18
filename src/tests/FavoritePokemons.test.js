import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRoute from './renderWithRoute';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste do componente FavoritePokemons', () => {
  test('Verifica se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRoute(<FavoritePokemons />);
    const msgNotFoundPoke = screen.getByText('No favorite pokemon found');
    expect(msgNotFoundPoke).toBeInTheDocument();
  });
  test('Verifica se há pokemons favoritados', () => {
    renderWithRoute(<App />);
    // após renderizar o App, clico no elemento link com name igual a 'More details'
    userEvent.click(screen.getByRole('link', {
      name: 'More details',
    }));
    // aqui pego a label no final da página de detalhes
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    // aqui vou p página de pokemons favoritados e vejo se tem algo com o data-testid
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const namePoke = screen.getByTestId('pokemon-name');
    expect(namePoke).toBeInTheDocument();
  });
});
