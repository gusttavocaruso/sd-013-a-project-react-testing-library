import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 3 - Verificando fluxo do componente <FavoritePokemons />', () => {
  renderWithRouter(<FavoritePokemons />);

  it('Veriifica se a mensagem "No favorite pokemon found" é renderizada', () => {
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Poison'));
    fireEvent.click(screen.getByText('More details'));
    fireEvent.click(screen.getByText('Pokémon favoritado?'));

    fireEvent.click(screen.getByText('Home'));

    fireEvent.click(screen.getByText('Dragon'));
    fireEvent.click(screen.getByText('More details'));
    fireEvent.click(screen.getByText('Pokémon favoritado?'));

    fireEvent.click(screen.getByText('Favorite Pokémons'));

    const ekans = screen.getByText('Ekans');
    expect(ekans).toBeInTheDocument();
    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();
  });
});
