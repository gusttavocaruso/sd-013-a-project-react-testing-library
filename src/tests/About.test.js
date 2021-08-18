import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  test('Se a página contém um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);

    const h2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(h2).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const paraText1 = /This application simulates a Pokédex/i;
    const paraText2 = /One can filter Pokémons by type/i;

    const firstPara = screen.getByText(paraText1);
    expect(firstPara).toBeInTheDocument();

    const secondPara = screen.getByText(paraText2);
    expect(secondPara).toBeInTheDocument();
  });

  test('Se a página contém uma imagem específica de uma Pokédex', () => {
    render(<About />);

    const img = screen.getByRole('img');
    expect(img.src)
      .toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
