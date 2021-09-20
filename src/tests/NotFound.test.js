import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRoute from './renderWithRoute';

describe('Teste o componente notFound', () => {
  test('Página com heading h2 com o texto Page requested not found', () => {
    renderWithRoute(<NotFound />);
    const h2NotFound = screen.getByText('Page requested not found');
    expect(h2NotFound).toBeInTheDocument('');
  });
  test('Testa se a página mostra a imagem', () => {
    renderWithRoute(<NotFound />);
    const pageNotFound = screen.getAllByRole('img')[1];
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pageNotFound).toBeInTheDocument('');
    expect(pageNotFound.src).toContain(src);
  });
});
