import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa componente "Not Found"', () => {
  it('Testa se a página contém um H2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem do "Pikachu"', () => {
    renderWithRouter(<NotFound />);

    const imagePikachu = screen.getByAltText(/pikachu crying because the page/i);

    expect(imagePikachu).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
