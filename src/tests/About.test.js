import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando o componente About', () => {
  it('Teste se a página contém um heading `h2` com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const headingH2 = screen.getByRole('heading', { level: 2 });
    expect(headingH2).toHaveTextContent(/About Pokédex/i);
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph = screen.getByText((content) => content
      .startsWith('This application'));
    const paragraph2 = screen.getByText((content) => content
      .startsWith('One can'));

    expect(paragraph).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
