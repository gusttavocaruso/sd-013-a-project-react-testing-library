import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 3 - Verificando fluxo do componente <FavoritePokemons />', () => {
  renderWithRouter(<FavoritePokemons />);

  it('Veriifica se a mensagem "No favorite pokemon found" é renderizada', () => {
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);

    const details = 'More details';
    const favoritar = 'Pokémon favoritado?';

    fireEvent.click(screen.getByText('Dragon'));
    fireEvent.click(screen.getByText(details));
    fireEvent.click(screen.getByText(favoritar));

    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText('Normal'));
    fireEvent.click(screen.getByText(details));
    fireEvent.click(screen.getByText(favoritar));

    fireEvent.click(screen.getByText('Favorite Pokémons'));

    const fav1 = screen.getByText('Snorlax');
    expect(fav1).toBeInTheDocument();
    const fav2 = screen.getByText('Dragonair');
    expect(fav2).toBeInTheDocument();

    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText('Normal'));
    fireEvent.click(screen.getByText(details));
    fireEvent.click(screen.getByText(favoritar));

    fireEvent.click(screen.getByText('Favorite Pokémons'));

    const newFav1 = screen.getByText('Dragonair');
    expect(newFav1).toBeInTheDocument();
  });
});
