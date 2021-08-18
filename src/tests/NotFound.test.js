import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Testando a página Not Found', () => {
  it('Testando se a página tem um h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = /Page requested not found/i;
    const h2Content = screen.getByRole('heading', { name: notFoundText, level: 2 });
    expect(h2Content).toBeInTheDocument();
  });

  it('Testando se na página existe a imagem especificada', () => {
    renderWithRouter(<NotFound />);
    const getImg = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(getImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
