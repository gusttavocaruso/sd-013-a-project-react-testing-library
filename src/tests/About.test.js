import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('verifica se contem um heading h2 com texto: About Pokédex', () => {
    render(<About />);
    const txtAboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(txtAboutPokedex).toBeInTheDocument();
  });
  // resolvi esse teste vendo o tutorial no notion da turma
  test('verifica se contem dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs).toHaveLength(2);
  });
  test('Verifica se a pagina contem a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
