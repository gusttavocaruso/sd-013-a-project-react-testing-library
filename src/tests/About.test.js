import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About.js tests', () => {
  test('Exibe um heading com um texto', () => {
    render(<About />);

    const heading = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Exibe dois paragráfos com textos', () => {
    render(<About />);
    const texto1 = /This application simulates a Pokédex, a digital /i;
    const texto2 = /One can filter Pokémons by type, and see more details/i;
    const primeiroP = screen.getByText(texto1);
    const segundoP = screen.getByText(texto2);

    expect(primeiroP).toBeInTheDocument();
    expect(segundoP).toBeInTheDocument();
  });

  test('Contém a imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    const href = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toHaveAttribute('src', href);
    expect(image).toBeInTheDocument();
  });
});
