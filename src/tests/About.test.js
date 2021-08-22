import { screen, render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('testa o componente About', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const heading = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    const paragraphOne = screen
      .getByText('This application simulates a Pokédex, a digital encyclopedia contain', {
        exact: false });
    const paragraphTwo = screen
      .getByText('One can filter Pokémons by type, and see more details for each one', {
        exact: false });

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Teste se a página contém uma imagem específica', () => {
    render(<About />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
