import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
// import NotFound from '../components/NotFound';

describe('Teste o componente Not Found', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const noMatchText = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(noMatchText).toBeInTheDocument();
  });
  it('Teste se página de testes mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const noMatchImg = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(noMatchImg.src).toBe(src);
  });
});
