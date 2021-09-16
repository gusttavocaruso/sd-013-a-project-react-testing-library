import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
// import App from '../App';

describe('Requisito 3: Teste o componente <FavoritePokemons.js />', () => { // descrição do teste
  test('3.1 - Teste se é exibido na tela a mensagem No favorite pokemon found', () => { // teste do requisito 1
    // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza todo o componente App */}
        <FavoritePokemons />
      </BrowserRouter>,
    );
    const noFavoritePokemonText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemonText).toBeInTheDocument();
  });
//   test('3.2 - Teste se é exibido todos os cards de pokémons favoritados.', () => {
//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>,
//     );
//   });
});
