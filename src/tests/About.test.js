import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { About } from '../components';

// test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
//   render(<About />);
//   const homeText = screen.getByText('About Pokemon');
//   expect(homeText).toBeInTheDocument();
//   expect(homeText.type).toBe();
// });

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
      name: /About Pokédex/i });
    expect(homeText).toBeInTheDocument(); // espera estar no documento
    // expect(homeText.type).toBe();
  });

  test('2.2 - Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const p1 = screen.getByText(/This application simulates a Pokédex/i); // espera um paragrafo com o seguinte texto
    expect(p1).toBeInTheDocument('p');

    const p2 = screen.getByText(/One can filter Pokémons by type/i);
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
