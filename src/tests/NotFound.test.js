import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js /> (req4)', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    // Acessa os elementos da tela
    renderWithRouter(<NotFound />);
    const h2Heading = screen.getByRole('heading',
      { name: /Page requested not found/i,
        level: 2 });

    // Faz o teste
    expect(h2Heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );

    // Faz o teste
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
