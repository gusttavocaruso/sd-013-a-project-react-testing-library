import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  test('se página contém um heading h2', () => {
    renderWithRouter(<NotFound />);

    const headText = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(headText).toBeInTheDocument();
  });

  test('se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    // https://testing-library.com/docs/queries/byalttext/
    // tive que mudar a role porque o emoji estava atrapalhando
    const altText = /Pikachu crying because the page requested was not found/i;
    const img = screen.getByAltText(altText);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    // source https://stackoverflow.com/a/61899027/16722994
    expect(img).toHaveAttribute('src', imgUrl);
  });
});
