// Referências:
// https://www.w3.org/TR/html-aria/#docconformance
// https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(/One can filter Pokémons by type, and see more details/i);
    expect(p2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
