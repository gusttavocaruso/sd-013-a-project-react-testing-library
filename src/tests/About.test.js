import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { About } from '../components';

describe('Testa componente "About"', () => {
  it('verifica que ao clicar no link "about" renderiza', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByText(/about/i);
    expect(linkAbout).toBeInTheDocument();

    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica que existe um "heading" e "dois paragrafos"', () => {
    renderWithRouter(<About />);

    const h2Text = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    const paragraph1 = screen.getByText(
      (content) => content.startsWith('This'),
    );
    const paragraph2 = screen.getByText(
      (content) => content.startsWith('One'),
    );

    expect(h2Text).toBeInTheDocument();
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Verifica se renderiza uma imagem específica', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');

    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
