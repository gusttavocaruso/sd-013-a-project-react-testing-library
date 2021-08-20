import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Teste o componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkDetails = screen.getByText(/More details/i);
    userEvent.click(linkDetails);

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);

    const favoritePokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritePokemon);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
