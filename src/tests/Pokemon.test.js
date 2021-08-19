import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  test('Testa se renderiza um card com informações do pokémon.', () => {
    // renderizar a pagina onde o componente é renderizado "app"
    renderWithRouter(<App />);
    // buscar o elemento "nome" getByTestId pega e testa pelo "id"
    const namePokemon = screen.getByTestId('pokemon-name');
    // testando o elemento "nome"
    expect(namePokemon).toHaveTextContent('Pikachu');
    // busca o elemento "tipo"
    const typePokemon = screen.getByTestId('pokemon-type');
    // testando o elemento "tipo"
    expect(typePokemon).toHaveTextContent('Electric');
    // busca o elemento "peso"
    const weightPokemon = screen.getByTestId('pokemon-weight');
    // testando o elemento "peso"
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    // buscando o elemento "imagem"
    const imagePokemon = screen.getByRole('img');
    // testando o link da imagem
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    // testando a propreidade da "imagem" no erro aparece "Pikachu sprite"
    expect(imagePokemon.alt).toBe('Pikachu sprite');
  });
  test('Testa se o card contém um link de navegação para exibir detalhes', () => {
    // renderiza a pagina onde o componente e renderizado "app"
    // renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    // buscando o elemento "link para pagina de detalhes"
    const linkDetails = screen.getByRole('link', { name: /details/i });
    // testando o elemento link detalhes
    expect(linkDetails).toBeInTheDocument();
    // testando o click do link detalhes
    userEvent.click(linkDetails);
    // testando se URL exibida no navegador muda
    // tranformar numa const { history } = renderWithRouter(<App />);
    // usar location?
    expect(history.location.pathname).toBe('/pokemons/25');
    // buscando o elemento " estrela em pokemons favoritos"
    const favoritePokemon = screen.getByText(/pokémon favorito?/i);
    // testando o evento se le é ou nao favorito
    userEvent.click(favoritePokemon);
    // buscando icone da img de favporitado
    const favoritesIcon = screen.getByRole('img', { name: /is marked as favorite/i });
    // testando a propriedade src
    expect(favoritesIcon.src).toBe('http://localhost/star-icon.svg');
    // testando a propriedade alt
    expect(favoritesIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
