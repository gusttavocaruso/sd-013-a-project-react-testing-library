import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />.', () => {
  it('A página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const h2 = screen.queryByText(/Page requested not found/i);
    expect(h2).toBeInTheDocument();
    expect(h2).toContainHTML('</h2>');
  });
  it('A página contém a seguinte imagem de uma Pokédex.', () => {
    render(<NotFound />);
    const notFoundImage = screen.queryAllByRole('img');
    expect(notFoundImage[1]).toBeInTheDocument();
    expect(notFoundImage[1]).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
