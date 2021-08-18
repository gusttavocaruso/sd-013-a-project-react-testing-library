import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

// teste feito com ajuda do Gesse Carlos
describe('Teste o componente FavoritePokemons', () => {
  it('teste mensagem no favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const sentence = screen.getByText('No favorite pokemon found');
    expect(sentence).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const checkBox = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkBox).toBeDefined();
    userEvent.click(checkBox);

    const favoritLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritLink).toBeDefined();
    userEvent.click(favoritLink);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
  });
});
