import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { About } from '../components';

describe('Requisito 2: Teste o componente <About.js />', () => { // descrição do teste
  test('2.1 - Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza todo o componente App */}
        <About />
      </BrowserRouter>,
    );
    const homeText = screen.getByRole('heading', {
      name: /about pokédex/i });
      // verifica se mostra na tela um heading com o texto 'about pokedex'
    expect(homeText).toBeInTheDocument(); // espera estar no documento
  });

  test('2.2 - Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    // verifica se mostra na tela um p com o texto
    const p1 = screen.getByText(/this application simulates a pokédex/i); // espera um paragrafo com o seguinte texto
    expect(p1).toBeInTheDocument('p');
    // verifica se mostra na tela um p com o texto
    const p2 = screen.getByText(/one can filter pokémons by type/i);
    expect(p2).toBeInTheDocument('p');
  });

  test('2.3 - Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    // verifica se mostra na tela a imagem de uma pokedex
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
