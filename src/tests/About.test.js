import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

describe('About', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const texth2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(texth2).toBeInTheDocument();
  });
  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const Paragrafo1 = (
      'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons'
    );
    expect(screen.getByText(Paragrafo1)).toBeInTheDocument();

    const Paragrafo2 = (
      'One can filter Pokémons by type, and see more details for each one of them'
    );
    expect(screen.getByText(Paragrafo2)).toBeInTheDocument();
  });
  test('Testa se a página contém a imagem de uma Pokédex.', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
