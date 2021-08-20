import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import NotFound from '../components/NotFound';

describe('Testando o componente About', () => {
  it('Teste se página contém o texto "Page requested not found 😭" ', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-nao-encontrada');

    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen
      .getByRole('img',
        { name: 'Pikachu crying because the page requested was not found' });
    expect(imgNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
