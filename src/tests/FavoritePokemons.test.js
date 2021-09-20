import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing Component FavoritePokemons', () => {
  test('Veriifica se a mensagem "No favorite pokemon found" é renderizada', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('Verifica se todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);

    const moreDetails = 'More details';
    const favoritar = 'Pokémon favoritado?';

    fireEvent.click(screen.getByText('Dragon'));
    fireEvent.click(screen.getByText(moreDetails));
    fireEvent.click(screen.getByText(favoritar));

    fireEvent.click(screen.getByText('Home'));

    fireEvent.click(screen.getByText('Normal'));
    fireEvent.click(screen.getByText(moreDetails));
    fireEvent.click(screen.getByText(favoritar));

    fireEvent.click(screen.getByText('Favorite Pokémons'));

    const favs = screen.getAllByText(/Average weight/i);
    expect(favs).toHaveLength(2);
  });
});
