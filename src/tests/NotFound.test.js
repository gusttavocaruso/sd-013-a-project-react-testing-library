import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing Component NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  test('Teste se contém um h2 na página NotFound.', () => {
    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se a página NotFound contém uma imagem do Pikachu chorando.', () => {
    const pikachuImg = screen.getByAltText(/Pikachu/i);
    expect(pikachuImg).toBeInTheDocument();
  });
});
