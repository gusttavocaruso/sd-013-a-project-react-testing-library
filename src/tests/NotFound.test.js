import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste do componente NotFound', () => {
  it('Contém um heading h2 com texto >Page requested not found 😭<', () => {
    render(<NotFound />);
    const titleNotFound = screen.getByText('Page requested not found');
    expect(titleNotFound).toBeInTheDocument();
  });
  it('Teste se a página contém pikachu chorando', () => {
    render(<NotFound />);
    const imagePokedex = screen
      .getByAltText('Pikachu crying because the page requested was not found').src
      .includes('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imagePokedex).toBeTruthy();
  });
});
