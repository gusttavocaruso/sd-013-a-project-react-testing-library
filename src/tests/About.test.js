import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente <About.js/>', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    // para renderizar a pagina
    renderWithRouter(<About />);
    // buscando o elemento "H2"
    const headingTwo = screen.getByRole('heading', { name: /About Pokédex/i });
    // testando o elemento
    expect(headingTwo).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // renderizando A pagina
    renderWithRouter(<About />);
    // buscando o elemento "p1"
    const paragraphOne = /This application simulates a Pokédex/i;
    const searchParagraphOne = screen.getByText(paragraphOne);
    expect(searchParagraphOne).toBeInTheDocument('p');
    // buscando o elemento "p2"
    const paragraphTwo = /One can filter Pokémons by type/i;
    const searchParagraphTwo = screen.getByText(paragraphTwo);
    expect(searchParagraphTwo).toBeInTheDocument('p');
  });

  test('Teste se a página contém imagem de uma Pokédex', () => {
    // rerizar a pagina
    renderWithRouter(<About />);
    // buscando o elemento
    const imgagePokemon = screen.getByRole('img');
    // testando o elemento
    expect(imgagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
