import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testar o About', () => {
  test('Teste se a página contém informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutAll = screen.getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });

  test('Teste se a página contém um <h2>', () => {
    renderWithRouter(<About />);
    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('Teste se página contém imagem', () => {
    renderWithRouter(<About />);
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(logo).toHaveAttribute('alt', 'Pokédex');
  });
});
