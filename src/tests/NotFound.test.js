import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Verifica se página tem um h2 com o texto "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/NotFound/');
    const notFound = screen.getByText(/Page requested not found/i);
    const emoji = screen.getByText('😭');
    expect(notFound).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });
  it('Verifica se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const frase = 'Pikachu crying because the page requested was not found';
    const srcAlt = screen.getByAltText(frase);
    expect(srcAlt).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
