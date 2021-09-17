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
    const homeText = screen.getByRole('heading', { // procura um head com o nome 'about pokedex
      name: /about pokédex/i });
    expect(homeText).toBeInTheDocument(); // espera estar no documento
    // expect(homeText.type).toBe();
  });

  test('2.2 - Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const p1 = screen.getByText(/this application simulates a pokédex/i); // espera um paragrafo com o seguinte texto
    expect(p1).toBeInTheDocument('p');

    const p2 = screen.getByText(/one can filter pokémons by type/i);
    expect(p2).toBeInTheDocument('p');
  });

  test('2.3 - Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
