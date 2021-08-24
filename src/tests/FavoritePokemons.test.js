import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
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

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    // Encontra o elemento "mais detalhes e clica nele"
    const moreDetails = screen.getByText(/More Details/i);
    fireEvent.click(moreDetails);

    // Encontra a checkbox para "favoritar" p Pokemon e clica nela
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favorite);

    // Encontra o link para a página de pokemons favoritos e clica nele.
    const favPokemon = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favPokemon);

    // Encontra a "estrela" que marca o pokemon como favorito e também os links de mais informação na página
    const starImage = screen.getAllByAltText(/is marked as favorite/i);
    const pokeCard = screen.getAllByText(/More Details/i);
    // Testa se numero de "estrelas" é igual ao número de links "mais detalhes" na página de FAVORITE POKEMON
    expect(starImage.length).toBe(pokeCard.length);
  });
});
