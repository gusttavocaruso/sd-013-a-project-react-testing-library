import React from 'react';
import { screen } from './index';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found ', () => {
    renderWithRouter(<NotFound />);

    const textNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(textNotFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem ', () => {
    renderWithRouter(<NotFound />);

    const phrase = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(phrase);

    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
