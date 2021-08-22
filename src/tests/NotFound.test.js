import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test notFound.js', () => {
  it('Verifica se a pagina "notFound" renderiza se não existir a URL', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe');

    const notFoundText = screen.getByText(
      (content) => content.startsWith('Page requested not found'),
    );
    expect(notFoundText).toBeInTheDocument();

    const notFoundImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
