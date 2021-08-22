import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Grupo de testes do requisito 3"
describe('Teste o componente <FavoritePokemons.js />. (req3)', () => {
  it('exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);

    // Interagiu clicando no Link "Favorite Pokemons" e pegou o histórico
    fireEvent.click(screen.getByText(/Favorite PoKémons/i));
    const { pathname } = history.location;

    // Faz o teste de Rota para "Favorite Pokemons"
    expect(pathname).toBe('/favorites');

    // Acessa os elementos da tela com o Texto "No favorite pokemon found"
    const notFavorite = screen.getByText(/No favorite pokemon found/i);

    // Testa se o elemento está no documento
    expect(notFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', async () => {
    renderWithRouter(<App />);
    // Interagiu clicando no Link "Favorite Pokemons"
    fireEvent.click(screen.getByText(/Favorite PoKémons/i));

    // Pega todas as imagens que tem o "alt = is marked as favorite"
    const favorite = await waitFor(async () => {
      screen.getAllByAltText(/is marked as favorite/i);
    });

    const moreDetails = await waitFor(() => {
      screen.getAllByRole('link', { name: /More Details/i });
    });

    expect(favorite.length).toBe(moreDetails.length);
  });
});
