import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste do componente "About"', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoText = screen
      .getByText(/this application simulates a Pokédex/i);

    expect(infoText).toBeInTheDocument();
  });

  it('Teste se a página contém um H2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const headingText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(headingText).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphOne = screen.getByText(/application simulates a Pokédex/i);
    const paragraphTwo = screen.getByText(/and see more details for each one of them/i);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
