import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import NotFound from '../components/NotFound';

describe('Teste da aplicação', () => {
  test('Teste se a página contém um heading h2', () => {
    renderWithRouter(<NotFound />);

    const headingNot = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(headingNot).toBeInTheDocument();
  });

  test('Teste se página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const getImg = screen.getAllByRole('img');
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getImg[1].src).toBe(img);
  });
});
