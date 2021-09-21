import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
// import App from '../App';

describe('Requisito 3: Teste o componente <FavoritePokemons.js />', () => { // descrição do teste
  test('3.1 - Teste se é exibido na tela a mensagem No favorite pokemon found', () => { // teste do requisito 3
    // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza o componente FavoritePokemons */}
        <FavoritePokemons />
      </BrowserRouter>,
    );
    // verifica se mostra na tela mensagem quando nao tem pokemon favorito
    const noFavoritePokemonText = screen.getByText('no favorite pokemon found',
      { exact: false });
    expect(noFavoritePokemonText).toBeInTheDocument();
  });
});
