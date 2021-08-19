import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    // renderizar a pagina
    renderWithRouter(<FavoritePokemons />);
    // buscando o elemento
    const text = screen.getByText(/No favorite pokemon found/i);
    // testando e elemento
    expect(text).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokemons favoritados', () => {
    // renderizar a pagina
    renderWithRouter(<App />);
    // buscando e testando o elementos detalhes
    const details = screen.getByRole('link', { name: /details/i });
    userEvent.click(details);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    // buscando e testando o elementos a escolha dos favoritos
    const chooseFavorite = screen.getByRole('checkbox');
    userEvent.click(chooseFavorite); // documentação test library utilização checkbox
    expect(screen.getByText('Electric')).toBeInTheDocument();
    // buscando e testando o elementos
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    expect(screen.getByText('Average weight: 6.0 kg'))
      .toBeInTheDocument();
  });
});
