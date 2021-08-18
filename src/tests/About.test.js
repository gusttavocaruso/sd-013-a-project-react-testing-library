import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
    });
    expect(aboutPokedex).toHaveTextContent('About Pokédex');
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    const secondP = screen.getByText(/and see more details for each one of them/i);
    expect(firstP && secondP).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
