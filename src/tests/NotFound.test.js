import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Conjunto de testes', () => {
  test('Testa se a página contém um heading h2 com um texto', () => {
    renderWithRouter(<NotFound />);
    const notFoundHeading = screen.getByText('Page requested not found');
    expect(notFoundHeading).toBeInTheDocument();
  });

  test('Testa se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getAllByRole('img');
    expect(notFoundImg[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
