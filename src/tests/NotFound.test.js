// Requisito 4
// Requisito desenvolvido com a ajuda da minha colega Sthefany Caroline Silva de Oliveira

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe(' Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(alt);

    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
