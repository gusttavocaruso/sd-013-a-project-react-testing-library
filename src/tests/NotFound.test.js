import { screen, render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('teste se página contém um h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: /Page requested not found Crying emoji/i,
      level: 2,
    }); // Crying emoji é um emoji... kk

    expect(heading).toBeInTheDocument();
  });

  test('teste se página mostra uma imagem específica.', () => {
    render(<NotFound />);

    const image = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
