import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', 'img', {
      name: /Page requested not found 😭/,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
