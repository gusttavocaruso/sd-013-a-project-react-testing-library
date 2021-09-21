import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 5: Teste o componente <Pokedex.js />', () => { // descrição do teste
  test('5.1 - Teste se página contém um h2 com o texto Encountered pokémons', () => { // teste do requisito 1
  // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza o componente App */}
        <App />
      </BrowserRouter>,
    );
    // verifica se mostra na tela o h2 com o texto
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  test('5.2 - Teste se é exibido o próximo Pokémon quando o botão é clicado', () => { // teste do requisito 1
  // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza o componente App */}
        <App />
      </BrowserRouter>,
    );
    // verifica se mostra na tela o botão de proximo
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();
    // simula o click no botão
    userEvent.click(btnNextPokemon);
  });

  test('5.3 - Teste se é mostrado apenas um Pokémon por vez', () => { // teste do requisito 5
    // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza o componente App */}
        <App />
      </BrowserRouter>,
    );

    const btnAll = screen.getByText('all', { exact: false });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
  });

  test('5.4 - Teste se a Pokédex tem os botões de filtro', () => {
    render(
      <BrowserRouter>
        {/* renderiza o componente App */}
        <App />
      </BrowserRouter>,
    );
    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilter[0]).toBeInTheDocument();
    userEvent.click(btnFilter[0]);
    expect(btnFilter[0].innerHTML).toBe('Electric');
  });
});
