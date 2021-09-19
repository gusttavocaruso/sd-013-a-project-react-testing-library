import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Verifica o funcionamento da página NotFound', () => {
  renderWithRouter(<NotFound />);
  it('Testa se página contém um heading h2'
  + 'com o texto Page requested not found 😭', () => {
    const h2 = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('Testa se página mostra a imagem esperada', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getAllByRole('img')[1];
    expect(img.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
