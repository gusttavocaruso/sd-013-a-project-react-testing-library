import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';
// consulta ao site - https://jestjs.io/pt-BR/docs/using-matchers
describe('Testa o componente <NotFound.js />', () => {
  test('Testa se página contém um heading h2 "Page requested not found"', () => {
    // renderiza a pagina
    renderWithRouter(<NotFound />);
    // buscar o elemento
    const headingTwo = screen.getByText(/Page requested not found/i);
    // testando o "H2"
    expect(headingTwo).toBeInTheDocument();
  });
  test('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    // renderiza a pagina
    renderWithRouter(<NotFound />);
    // buscar o elemento usando a propriedade "alt" no name
    const imageGif = screen.getByRole('img', { name: /Pikachu crying because/i });
    // testando o "H2"
    expect(imageGif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
