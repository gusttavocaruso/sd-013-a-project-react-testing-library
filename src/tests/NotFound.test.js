import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭;', () => {
    renderWithRouter(<NotFound />);

    const h2NotFound = screen.getByRole('heading', { level: 2 });
    expect(h2NotFound).toBeInTheDocument();
    expect(h2NotFound).toHaveTextContent('Page requested not found 😭');
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);

    // tem duas imagens na página, contando com o emogi 😭
    const image = screen.getAllByRole('img')[1];
    const linkImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', linkImage);
  });
});
