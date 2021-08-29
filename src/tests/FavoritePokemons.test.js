import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  test('Verifica se a mensagem No favorite p', () => {
    render(<FavoritePokemons />);
    const msg = screen.getByText(/no favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });
  // desenvolvi vendo o notion da turma, deu uma clareada.
  test('Testa se é exibido todos pokemons favoritados', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    userEvent.click(screen.getByText('Fire')); // aqui seleciona o tipo do pokemon
    userEvent.click(screen.getByText('More details')); // clica em mais detalhes pra logo
    userEvent.click(screen.getByText('Pokémon favoritado?')); // em seguida favoritar
    userEvent.click(screen.getByText(/Favorite Pokémons/i)); // vai pra pagina de favoritos
    const charmander = screen.getByText('Charmander'); // pega o texto e verifica se está
    expect(charmander).toBeInTheDocument();
  });
});
